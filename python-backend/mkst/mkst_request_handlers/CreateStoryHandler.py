import tornado.web
import json

from mkst_services.DataService import DataService

class CreateStoryHandler(tornado.web.RequestHandler):

    def options(self, *args):
        self.set_status(204)
        self.finish()

    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with, Content-Type")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    @tornado.web.asynchronous
    def get(self, *args):
        self.add_header("Content-Type", "application/json")
        print("you hit the get function of the CreateStoryHandler")
        self.write("you hit the get function of the CreateStoryHandler with args[0] = "+args[0])
        self.flush()
        self.finish()

    @tornado.web.asynchronous
    def post(self, *args):
        self.add_header("Content-Type", "application/json")
        print("you hit the post function of the CreateStoryHandler")
        _storyListName = args[0]
        # get the request body as a JSON object
        # request should include "addition", "title", "storyIndex", and "author"
        _data = json.loads(self.request.body)
        