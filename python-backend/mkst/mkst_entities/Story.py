from Revision import Revision

# stories are lists of revisions with a title and an index for an identifier

class Story:
    def __init__(self):
        self.revisionList = []
    def makeStory(self, storyName, storyIndex, author, firstEntry):
        self.open = true
        self.storyName = storyName
        self.storyIndex = self.revisionList.len()
        reviseStory(storyIndex, author, entry)
    
    def reviseStory(self, storyIndex, author, entry):
        _newRevision = Revision.makeRevision(author, entry)
        self.revisionList.append(_newRevision)