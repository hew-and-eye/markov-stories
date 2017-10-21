from Story import Story

class StoryList:
    storyList = []
    # def __init__(self, storyListName):
    #     self.storyList = []
    #     self.storyListName = storyListName
    def makeStoryList(self, storyListName):
        self.storyListName = storyListName
    def addStory(self, storyName, author, firstEntry):
        Story.makeStory(storyName, len(StoryList.storyList), author, entry)
    def testFunc():
        print("testFunc works!")