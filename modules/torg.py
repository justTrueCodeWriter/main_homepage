import os
import sys
from datetime import datetime, timedelta
from io import TextIOWrapper
import re

currentTime = datetime.now()
curWeekday = currentTime.strftime("%A")
curWeekNumber = currentTime.strftime("%W")
curDay = currentTime.strftime("%d")
curMonth = currentTime.strftime("%m")
curYear = currentTime.strftime("%Y")

months = ('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December')

scheduleDate = f"{curYear}-{curMonth}-{curDay}"

def get_schedule(filename: str) -> dict:
    file = open(filename, 'r')
    title = f"{curWeekday} {curDay} {months[int(curMonth)-1]} {curYear} W{curWeekNumber}"
    content = []
    noteLine = ''
    isScheduled = False
    lineNumber = -1
    for line in file:
        if ("SCHEDULED: <" + scheduleDate in line):
            isScheduled = True
            noteLine = noteLine.replace('\n', '')
            if ("TODO" in noteLine):
                content.append({
                    "line_number": lineNumber,
                    "note": noteLine,
                    "status": "TODO"
                    })
            elif ("DONE" in noteLine):
                content.append({
                    "line_number": lineNumber,
                    "note": noteLine,
                    "status": "DONE"
                    })
        noteLine = line
        lineNumber+=1
    if (isScheduled == False):
        content.append({
            "line_number": 0,
            "note": "Nothing is scheduled! ;)"
        })
    file.close()

    return {
            "title": title,
            "content": content
        }


def get_todo(filename: str, tag_filter: str) -> dict:
    file = open(filename, 'r')
    content = []
    noteLine = ''
    isTodo = False
    isFilterActive = False
    lineNumber = -1

    if (tag_filter):
        isFilterActive = True

    for line in file:
        noteLine = noteLine.replace('\n', '')
        if ("TODO" in noteLine and (f":{tag_filter}:" in noteLine)):
            isTodo = True
            content.append({
                "line_number": lineNumber,
                "note": noteLine,
            })
        if("TODO" in noteLine and not isFilterActive):
            isTodo = True
            content.append({
                "line_number": lineNumber,
                "note": noteLine,
            })
        noteLine = line
        lineNumber+=1
    if (isTodo == False):
        content.append({
            "line_number": 0,
            "note": "Nothing todo! ;)"
        })
    file.close()

    return {
            "title": None,
            "content": content
        }

def get_agenda(filename: str) -> dict:
#----Init agenda_dict for 7 days----
    agenda_dict = dict()
    title = []
    content = []
    timeToday = datetime.now()
    for i in range (0, 7):
        dt = timeToday + timedelta(days=i)
        weekday = dt.strftime("%A")
        weekNumber = dt.strftime("%W")
        day = dt.strftime("%d")
        month = dt.strftime("%m")
        year = dt.strftime("%Y")

        iterSchedDate = f"{year}-{month}-{day}"
        agenda_dict.update({iterSchedDate: []})

#----Fill agenda_dict with notes----
    with open(filename, 'r') as file:
        noteLine = ''
        lineNumber = -1
        for line in file:
            match = re.search(r'\d{4}-\d{2}-\d{2}', line)
            if match and "SCHEDULED:" in line:
                key = match.group()
                if (key in agenda_dict):
                    noteLine = noteLine.replace('\n', '')
                    if("TODO" in noteLine):
                        agenda_dict[key].append({
                            "line_number": lineNumber,
                            "note": noteLine,
                            "status": "TODO"
                            })
                    elif ("DONE" in noteLine):
                        agenda_dict[key].append({
                            "line_number": lineNumber,
                            "note": noteLine,
                            "status": "DONE"
                            })
            noteLine = line
            lineNumber+=1

#----Print agenda----
    for i, agendaDate in enumerate(agenda_dict.keys()):
        timeToday = datetime.strptime(agendaDate, "%Y-%m-%d")
        dt = timeToday
        weekday = dt.strftime("%A")
        weekNumber = dt.strftime("%W")
        day = dt.strftime("%d")
        month = dt.strftime("%m")
        year = dt.strftime("%Y")


        title.append(f"{weekday} {day} {months[int(month)-1]} {year} W{weekNumber}")
        content.append([])
        if not agenda_dict[agendaDate]:
            content[i].append({
                "line_number": 0,
                "note": "Nothing is scheduled! ;)"
            })
        for note in agenda_dict[agendaDate]:
            content[i].append(note)

    return {
            "title": title,
            "content": content
            }

def set_task_done(filename: str, str_number: int) -> None:
    file = open(filename, 'r')
    data = file.readlines()
    file.close()

    file = open(filename, 'w')
    for i in range(0, len(data)):
        if (i==str_number):
            if (data[i].find("TODO") != -1):
                data[i] = data[i].replace("TODO", "DONE")
            elif (data[i].find("DONE") != -1):
                data[i] = data[i].replace("DONE", "TODO")

    file.writelines(data)
    file.close()
