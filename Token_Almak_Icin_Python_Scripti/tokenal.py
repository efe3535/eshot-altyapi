#!/usr/bin/python3
from requests import post

"""
curl 'https://mobilapp.eshot.gov.tr/token' \
-X POST \
-H 'Host: mobilapp.eshot.gov.tr' \
-H 'Connection: keep-alive' \
-H 'Accept: */*' \
-H 'User-Agent: ESHOTv2/1 CFNetwork/1404.0.5 Darwin/22.3.0' \
-H 'Accept-Language: en-US,en;q=0.9' \
-H 'Content-Length: 99' \
-H 'Content-Type: application/x-www-form-urlencoded' \
-d 'grant_type=password&username=pbOSmr6DUd29dDc6t40eG3AiP&password=crKI0T2gn2bdY4hCWJDDH7jO2zUycGBafen' \
--proxy http://localhost:9090
"""

x = post("https://mobilapp.eshot.gov.tr/token", data="grant_type=password&username=pbOSmr6DUd29dDc6t40eG3AiP&password=crKI0T2gn2bdY4hCWJDDH7jO2zUycGBafen", 

json={
    "Host": "mobilapp.eshot.gov.tr",
    "Connection":"keep-alive",
    "Accept":"*/*",
    "User-Agent":"ESHOTv2/1 CFNetwork/1404.0.5 Darwin/22.3.0",
    "Accept-Language":"en-US,en;q=0.9",
    "Content-Length": "99",
    "Content-Type":"application/x-www-form-urlencoded",

    }
)
f=open("/home/ubuntu/token","w")
f.write(x.content.decode("utf-8"))

f.close();
