from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from rest_framework import status
from django.contrib.auth import authenticate
from .serializers import UserSerializer

# ML models
# import libraries
import pandas as pd
from nltk.tokenize import word_tokenize
from nltk.corpus import stopwords
from nltk.stem import WordNetLemmatizer
from sklearn.feature_extraction.text import TfidfVectorizer
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModel

tokenizer = AutoTokenizer.from_pretrained('bert-base-uncased')
model = AutoModel.from_pretrained('bert-base-uncased')

def key_word_extraction(text_data):
  tokens = word_tokenize(text_data.lower())
  stop_words = set(stopwords.words('english'))
  tokens = [token for token in tokens if token not in stop_words]
  lemmatizer = WordNetLemmatizer()
  tokens = [lemmatizer.lemmatize(token) for token in tokens]
  text = ' '.join(tokens)
  tfidf = TfidfVectorizer()
  tfidf_scores = tfidf.fit_transform([text])
  feature_names = tfidf.get_feature_names_out()
  top_keywords = [feature_names[i] for i in tfidf_scores.toarray()[0].argsort()[::-1]]
  return top_keywords

def sentence_embedding(sentence):
    input_ids = torch.tensor(tokenizer.encode(sentence, add_special_tokens=True)).unsqueeze(0)
    outputs = model(input_ids)
    last_hidden_states = outputs.last_hidden_state
    sentence_embedding = torch.mean(last_hidden_states, dim=1).squeeze()
    return sentence_embedding

def cosine_similarity(u, v):
    return torch.dot(u, v) / (torch.norm(u) * torch.norm(v))

df = pd.read_csv('course_desc_new.csv')
# df = pd.read_csv('./backend/course_desc_new.csv')
course_tensors = df['Course_Description'].apply(lambda x: sentence_embedding(x))
# Till the above functions, NLP occurs

# Now dyanmic questions for test part (for game)
import openai
import json
import re

openai.api_key = "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"

def pipelinegpt(corpus):
    prompt = "Generate a list of 5 multiple choice questions for an user to find out how much do they know about this course print the 4 choices for each question where only one of them is valid and print JUST the answer option in the next line, and start the line with 'Answer:'.  "+corpus

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role":"user","content":prompt}])    
    
    return json.loads(str(response.choices[0].message))['content']

# pattern = r"(\d+\. .+?)\n(a\. .+?)\n(b\. .+?)\n(c\. .+?)\n(d\. .+?)\n\nAnswer: ([a-d])\. (.+?)\s*"
regex = r"^\d+\.\s+(.+)\?[\n\r]+([a-dA-D]\).+)[\n\r]+([a-dA-D]\).+)[\n\r]+([a-dA-D]\).+)[\n\r]+([a-dA-D]\).+)[\n\r]+(Answer: ([a-dA-D]).+)"

df1 = pd.read_csv('course_content.csv')
# df1 = pd.read_csv('./backend/course_content.csv')

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token = Token.objects.create(user=user)
        return Response({'token': token.key}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, email=email, password=password)
    if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        return Response({'token': token.key})
    return Response({'error': 'Invalid Credentials'}, status=status.HTTP_401_UNAUTHORIZED)

@api_view(['GET'])
@permission_classes([AllowAny])
def register_form(request):
    form_responses = {}
    num_q = int(request.data.get('num_questions'))
    if num_q == 0:
        return Response({'error': 'No responses found.'}, status=status.HTTP_404_NOT_FOUND)
    for i in range(num_q):
        form_responses[f'q{i + 1}'] = request.data.get(f'q{i + 1}')
    # Here model to predict interest of users
    # say interest is 'interest'
    embeddings = list(range(num_q))
    for i in range(num_q):
        embeddings[i] = key_word_extraction(form_responses[f'q{i + 1}'])
    interest_sentence = " ".join([word for inner_list in embeddings for word in inner_list])
    interest_embedding = sentence_embedding(interest_sentence)
    similarity_array = list() # This dict will have similarity, and id of course whose similarity it is
    for i, j, k, l in zip(df['Course_ID'], course_tensors, df['Course_Name'], df['Course_Description']):
        similarity_array.append((f'{i}', (cosine_similarity(interest_embedding, j), f'{k}', f'{l}')))
    response_obj = dict(sorted(similarity_array, key=lambda x: x[1][0], reverse=True)[:10])
    # for i in range(num_q):
    #     response_obj[f'q{i + 1}'] = request.data.get(f'q{i + 1}')
    return Response(response_obj, status=status.HTTP_200_OK)

# The following API is redundant because functionality was satisfied in above API
# @api_view(['POST'])
# @permission_classes([AllowAny])
# def course_rec(request):
#     interest = request.data.get('interest')
#     # run model for course ID's as recommendation based on description matching
#     # say course id's matching are from 1 to 5, so return those ids
#     # say 5 courses are matching
#     response_obj = {}
#     match_ids = [1, 2, 3, 4, 5]
#     for i in range(len(match_ids)):
#         response_obj[f"id{i}"] = str(match_ids[i])
#     return Response(response_obj, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def game_para(request):
    title = request.data.get('title')
    if title not in df1['title'].values:
        return Response({'error': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
    # get the paras based on title
    final = tuple(df1[df1['title'] == title].iloc[0])
    response_obj = {}
    for i in range(len(final)):
        if i == 0:
            response_obj['title'] = str(final[i])
        else:
            if str(final[i]) != '0':
                response_obj[f'level {i}'] = str(final[i])
    return Response(response_obj, status=status.HTTP_200_OK)

@api_view(['GET'])
@permission_classes([AllowAny])
def game_test(request):
    # algo ko title pass kar, and whatever output is there just relay it
    title = request.data.get('title')
    if title not in df1['title'].values:
        return Response({'error': 'Course not found.'}, status=status.HTTP_404_NOT_FOUND)
    # get the paras based on title
    final = list(df1[df1['title'] == title].iloc[0])
    info_string = ""
    for i in range(len(final)):
        if i != 0 and str(final[i]) != '0':
            info_string += final[i]
    q = pipelinegpt(info_string)
    # print(q)
    # matches = re.findall(regex, str(q), re.MULTILINE)
    # print(matches)
    response_obj = {}
    # for i, match in enumerate(matches):
    #     question = match.group(1)
    #     options = [match.group(i) for i in range(2, 6)]
    #     correct_answer = match.group(6)
    #     ques = {
    #         'question': f"{i}. {question}?",
    #         'option_a': options[0],
    #         'option_b': options[1],
    #         'option_c': options[2],
    #         'option_d': options[3],
    #         'correct_answer': correct_answer
    #     }
    #     response_obj[f'q{i}'] = ques
    # print(q)
    print(q)
    ques_list = q.split('\n')
    # print(ques_list)
    i = 0
    while i < len(ques_list):
        if len(ques_list[i]) == 0:
            i += 1
            continue
        question = None
        options = []
        correct_answer = None
        if ques_list[i][0] in ['1', '2', '3', '4', '5']:
            question = str(ques_list[i])
            i += 1
            k = 0
            # while i < len(ques_list) and ques_list[i][:5] not in 'Answer':
            while i < len(ques_list) and k < 4:
                if len(ques_list[i]) == 0:
                    i += 1
                    continue
                options.append(str(ques_list[i]))
                i += 1
                k += 1
            if len(ques_list[i]) == 0:
                i += 1
            correct_answer = str(ques_list[i])
        # print(options)
        # print(options[0])
        print(len(options))
        ques = {
            'question': question,
            'option1': options[0],
            'option2': options[1],
            'option3': options[2],
            'option4': options[3],
            'correct_answer': correct_answer
        }
        response_obj[f'q{question[0]}'] = ques
        i += 1

    return Response(response_obj, status=status.HTTP_200_OK)