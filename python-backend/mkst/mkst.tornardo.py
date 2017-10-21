import tornado.ioloop
import tornado.web
import json

from mkst_entities.StoryList import StoryList

class DataService:
    storyListList = []
    # look for a matching name and return values depending on the optype
    def getStoryList(self, optype, name):
        for storyList in DataService.storyListList:
            if storyList.storyListName == name:
                if optype == "check": # the client is just checking if there's a match - no need to create
                    return "true"
                if optype == "join":
                    return DataService().getPrompt(name)
        # if no match exists
        if optype == "check":
            return "false"
        if optype == "join":
            #StoryList().testFunc()
            _newStoryList = StoryList()
            _newStoryList.makeStoryList(name)
            DataService.storyListList.append(_newStoryList)
            return "You created a new story list called "+ name + ". Begin a new story!"

    def getPrompt(self, name):
        return "the getPrompt function should find a story list named " + name + ", find an open story, and return the content of its last revision"

class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def get(self):
        self.write("This is the Markov Stories server.")

class StoryListHandler(tornado.web.RequestHandler):
    def set_default_headers(self):       
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    @tornado.web.asynchronous
    def get(self, *args): 
        #self.write("check/initialize: " + args[0] + " name: " + args[1])
        #self.write(DataService().getStoryList(args[0], args[1]))
        _returnString = DataService().getStoryList(args[0], args[1])
        self.add_header("Content-Type", "application/json")
        _response = {}
        _response["content"] = _returnString
        self.write(json.dumps(_response))
        self.flush()
        self.finish()

    @tornado.web.asynchronous
    def post(self, *args):
        # check whether the named storyset exists in the server-side list (not the db for now)
        # if the storyset exists, return a prompt, else return nothing
        _returnString = DataService().getStoryList(args[0], args[1])
        self.add_header("Content-Type", "application/json")
        _response = {}
        _response["content"] = _returnString
        self.write(json.dumps(_response))
        self.flush
        print("hit the post function")
        self.finish()
        
def make_app():
    return tornado.web.Application([
        (r"/", MainHandler),
        # Call this when joining or creating a story list
        (r"/storylist/([a-z]+)/([a-zA-Z0-9]+[a-zA-Z0-9-_]+[a-zA-Z0-9]+)", StoryListHandler),
        (r"/storylist/([a-z]+)/([a-zA-Z0-9]+)", StoryListHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8080)
    tornado.ioloop.IOLoop.current().start()