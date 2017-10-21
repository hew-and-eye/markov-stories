import json

from mkst_entities.StoryList import StoryList

class DataService:
    storyListList = []
    # look for a matching name and return values depending on the optype
    def getStoryList(self, optype, name):
        for storyList in DataService.storyListList:
            if storyList.storyListName == name:
                if optype == "check": # the client is just checking if there's a match - no need to create
                    return {"exists":True}
                if optype == "join":
                    return DataService().getPrompt(name)
        # if no match exists
        if optype == "check":
            return {"exists":False}
        if optype == "join":
            #StoryList().testFunc()
            _newStoryList = StoryList()
            _newStoryList.makeStoryList(name)
            DataService.storyListList.append(_newStoryList)
            _returnJSON = {}
            _returnJSON["prompt"] = ("You created a new story list called " +
                name + ". Begin a new story!")
            _returnJSON["new_story"] = True
            _returnJSON["storyIndex"] = -1 # a storyIndex of -1 creates a new story
            return _returnJSON

    def getPrompt(self, name):
        _returnJSON = {}
        _returnJSON["prompt"] = ("the getPrompt function should find a story list named " + 
            name + ", find an open story, and return the content of its last revision")
        _returnJSON["new_story"] = False
        return _returnJSON