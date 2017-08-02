#coding=utf-8
__author__ = 'Administrator'
import requests,json
import xlrd,re
from cases import myCases

def readexcel(filepath):
    myFilecases=[]
    data =xlrd.open_workbook(filepath)
    sheet = data.sheet_by_index(0)
    nrows =sheet.nrows
    ncols = sheet.ncols
    for i in range(nrows):
        if i !=0:
            myFilecases.append(sheet.row_values(i))  #获取每行的值
    return myFilecases



# #从python文件字典读取用例
# def res():
#     case_list=[]
#     for case in myCases:
#         r = ""
#         try:
#             ret =requests.post(url='http://tqt.weibo.cn/vicinity.php',data={'addr':'海淀区中关村新浪大厦','desc':case["des"]})
#             r=ret.text
#             ret_json = ret.json()
#             ret_json["except_icontype"] = case["except_icontype"]
#             ret_json["except_short"] = case["except_short"]
#             case_list.append(ret_json)
#         except Exception as e:
#             error = {}
#             error["description"] = case["des"]
#             # error["precipitation"] = ""
#             error["short"] = ""
#             error["icon_type"] = ""
#             error["remark"] = "拋異常啦！"
#             case_list.append(error)
#
#             print(r)
#             print(e)
#     return case_list


#从excel读取用例
def resFileExcel():
    case_list=[]
    filepath="F:\\data.xlsx"
    for case in readexcel(filepath):
        r = ""
        try:
            ret =requests.post(url='http://tqt.weibo.cn/vicinity.php',data={'addr':'海淀区中关村新浪大厦','desc':case[0]})
            r=ret.text
            ret_json = ret.json()
            ret_json["remark"] = ""
            ret_json["except_short"] = case[1]
            ret_json["except_icontype"] = case[2]
            if ex_noti_text(case[0])==" ":
                ret_json["ex_noti_text"] = ex_noti_text(case[0])

            else:
                ret_json["ex_noti_text"] = ex_noti_text(case[0])+ preci_list(ret_json["precipitation"])

            ret_json["ex_noti_title"] = ""

            case_list.append(ret_json)
        except Exception as e:
            error = {}
            error["description"] = case[0]
            # error["precipitation"] = ""
            error["short"] = ""
            error["icon_type"] = ""
            error["remark"] = u"拋異常啦！"
            error["except_short"] = ""
            error["except_icontype"] = ""
            error["noti_text"] = ""
            error["ex_noti_text"] = ""
            error["noti_title"] = ""
            error["ex_noti_title"] = ""
            case_list.append(error)

            print(r)
            print(e)
    return case_list


judgeList = readexcel("F:\\vicivity.xlsx")
judgeList1=readexcel("F:\\vicivity1.xlsx")



#若彩云description中只包含“雨”则noti_text中的Z为"雨"；
#若彩云description中只包含“雪”，则noti_text中的Z为"雪"；
#若彩云description中同时包含“雨”和“雪”，则noti_text中的Z为"雨"；


def ex_noti_text(description):

    # 1.先把雨或者雪替换
    # 2。再把MM替换
    mmList = getMM(description)
    for MM in mmList:
        description = description.replace(MM,u'时间')
    exNoticeText = ""
    for judge in judgeList:
        if u"雨" in description and u"雪" not in description:
            replace_z= judge[7].replace('Z',u'雨')
        elif u"雪" in description and u"雨" not in description:
            replace_z= judge[7].replace('Z',u'雪')
        elif u"雪" not in description and u"雨" not in description:
            replace_z= judge[7].replace('Z',u'雨')

        if judge[0] in description and judge[1] in description and judge[2] in description and judge[3] in description and judge[4] in description and judge[5] in description and notInCheck(judge[6],description):
            exNoticeText = u"您所在的位置"+ replace_z
            break

    return exNoticeText


def notInCheck(notInString,description):
    if notInString=="":
        return True
    notInList = notInString.split(",")
    result = True
    for notIn in notInList:
        if notIn in description:
            result = False
            break
    return result



def judge_time(description):
    for judge in judgeList:
        for i in range(0-7):
            if "时间" in judge[i]:
                i+=1
                if i==1:
                    judgeTime=judge[i].replace(u"时间","getMM()")
    return judgeTime


# 若彩云minutely→precipitation_2h中前60个数中至少有20个数大于0.35，则noti_text字段-提示为“降Z较强请注意防范！”
# 否则noti_text字段-提示为“出门要记得带伞哦！”
def preci_list(precipitation_value):

    # 大于0.35的统计变量
    count = 0
    precipitation_list = precipitation_value.split(",")
    for i in range(len(precipitation_list)):
        if i > 59:
            break
        if float(precipitation_list[i]) > 0.35:
            count += 1

    if count >= 20:
        return u"降雨较强请注意防范！"
    else:
        return u"出门要记得带伞哦！"

def getMM(description):
    pattern  = re.compile(u"\d{1,2}分钟|[半,一][个]?小时")
    MM_list=pattern.findall(description)
    return MM_list

def replace_time(description):
    mmList = getMM(description)
    for MM in mmList:
        description = description.replace(MM,u'时间')
    return description

if __name__ == "__main__":
    #print(preci_list("0.15,0.14,0.11,0.04,0.36,0.17,0.44,0.18,0.19,0.29,0.13,0.31,0.07,0.14,0.44,0.1,0.49,0.41,0.01,0.3,0.19,0.09,0.16,0.07,0.28,0.44,0.29,0.23,0.22,0,0.35,0.21,0.31,0.48,0.34,0.31,0.49,0.22,0.11,0.45,0.2,0.31,0.3,0.01,0.25,0.07,0.23,0.39,0.31,0.01,0.1,0.4,0.03,0.09,0.34,0.21,0.08,0.41,0.42,0.36"))
    #print(preci_list("0.11,0.41,0.03,0.14,0.32,0.01,0.04,0.5,0.14,0.03,0.04,0.47,0.2,0.35,0.4,0.17,0.23,0.19,0.08,0.26,0.32,0.4,0.27,0.08,0.26,0.49,0.27,0.12,0.09,0.43,0.29,0.34,0.31,0.12,0.05,0.12,0.48,0.16,0.01,0.29,0.38,0.48,0.03,0.04,0.23,0.17,0.19,0.38,0.43,0.1,0.34,0.26,0.41,0.35,0.21,0.2,0.32,0.03,0.24,0.35"))
    # print(getMM(u"一小时后开始下小雨，但80分钟后会变小"))
    print(ex_noti_text(u"大雨就要来了，并还会持续"))
