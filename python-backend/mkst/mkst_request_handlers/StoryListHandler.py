import tornado.web
import json

from mkst_services.DataService import DataService

class StoryListHandler(tornado.web.RequestHandler):
    def set_default_headers(self):       
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    @tornado.web.asynchronous
    def get(self, *args): 
        self.add_header("Content-Type", "application/json")
        _response = DataService().getStoryList(args[0], args[1])
        self.write(json.dumps(_response))
        self.flush()
        self.finish()

    @tornado.web.asynchronous
    def post(self, *args):
        # Checks whether a StoryList with the given name exists or creates a StoryList with the given name
        self.add_header("Content-Type", "application/json")
        _response = DataService().getStoryList(args[0], args[1])
        self.write(json.dumps(_response))
        self.flush()
        print("hit the post function")
        self.finish()