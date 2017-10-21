from Revision import Revision

# stories are lists of revisions with a title and an index for an identifier

class Story:
    def __init__(self):
        self.revisionList = []
        self.numOfRevisions = 0
    def makeStory(self, storyName, author, firstEntry):
        self.open = True
        self.storyName = storyName
        self.numOfRevisions = 0
        reviseStory(storyIndex, author, entry)
    
    def reviseStory(self, author, entry):
        _newRevision = Revision.makeRevision(author, entry)
        self.revisionList.append(_newRevision)
        self.numOfRevisions += 1
    
    # Called by StoryList when getting a retrieving a story to revise
    # Closes the story and returns the last revision as a JSON
    # Selecting which story to get happens in the StoryList.getPrompt
    def getPrompt(self):
        self.open = False
        _latestRevision = self.revisionList[-1] # <-- ok hold up this is some beautiful syntax right here. Python, I think I'm falling for you...
        _returnJSON = { "author": _latestRevision.author, "prompt":_latestRevision.prompt }