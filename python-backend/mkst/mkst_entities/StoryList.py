from Story import Story

class StoryList:
    storyList = []
    # def __init__(self, storyListName):
    #     self.storyList = []
    #     self.storyListName = storyListName
    def makeStoryList(self, storyListName):
        self.storyListName = storyListName

    def addStory(self, storyName, author, firstEntry):
        Story.makeStory(storyName, author, entry)
    
    def getPrompt(self, name):
        if len(StoryList.storyList) > 0:
            _minRevisions = StoryList.storyList[0].revisions
            _storyIndex = 0
            # iterate through the list of Stories to find the open story with the fewest revisions
            for i, story in enumerate(StoryList.storyList):
                if story.open and story.numOfRevisions > _minRevisions:
                    _minRevisions = story.numOfRevisions
                    _storyIndex = i
            # return the selected story's index and last revision in a JSON object
            # Story.getPrompt returns a JSON with the Story's latest revision and closes the story
            _returnJSON = StoryList.storyList[_storyIndex].getPrompt()
            # the client needs _storyIndex so when it submits its next revision it knows which story to add it to
            _returnJSON["storyIndex"] = _storyIndex
    
    # update storyList[storyIndex] with Revision(author, newEntry)
    def reviseStory(self, storyIndex, author, newEntry):
        StoryList.storyList[storyIndex].reviseStory(author, newEntry)
        StoryList.storyList[storyIndex].open = True
            
            
