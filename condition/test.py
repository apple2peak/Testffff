#coding:utf-8
__author__ = 'Administrator'

import re
aaa = u"雨渐大，直到90分钟后雨停雨渐小，直到一个小时后雨停"
bbb = u"雨渐小，直到一个小时后雨停"
ccc = u"一小时后开始下小雨，但80分钟后会变小"
ddd = u"这个字符串啥都没有"


def getMM(description):
    pattern  = re.compile(u"\d{1,2}分钟|[半,一][个]?小时")
    MM_list=pattern.findall(description)
    return MM_list   #返回正则表达式所有匹配结果的列表


def replace_MM(description):
    mmList = getMM(description)
    for MM in mmList:
        description = description.replace(MM,u'时间')
    return description

def split_des(description):
    split_list =replace_MM(description)
    return split_list.split(',')



if __name__ == "__main__":
    #print(getMM(u"一小时后开始下小雨，但80分钟后会变小"))
    print(replace_MM(u"一小时后开始下小雨,但80分钟后会变小"))
    print( split_des(u"一小时后开始下小雨但80分钟后会变小"))