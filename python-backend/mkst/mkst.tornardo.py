import tornado.ioloop
import tornado.web
import json

from mkst_request_handlers.StoryListHandler import StoryListHandler
from mkst_request_handlers.CreateStoryHandler import CreateStoryHandler

# just leaving this here just in case I need a stripped down request handler as an example
class MainHandler(tornado.web.RequestHandler):
    def set_default_headers(self):
        self.set_header("Access-Control-Allow-Origin", "*")
        self.set_header("Access-Control-Allow-Headers", "x-requested-with")
        self.set_header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')

    def get(self):
        self.write("This is the Markov Stories server.")


def make_app():
    return tornado.web.Application([
        #(r"/", MainHandler),
        # Call these when joining or creating a story list (need 2 regexes in case of short StoryList names)
        (r"/storylist/([a-z]+)/([a-zA-Z0-9]+[a-zA-Z0-9-_]+[a-zA-Z0-9]+)", StoryListHandler),
        (r"/storylist/([a-z]+)/([a-zA-Z0-9]+)", StoryListHandler),
        # Call these when creating a story: url should include the StoryList name
        # body should include the author, title, and first entry
        (r"/createstory/([a-zA-Z0-9]+[a-zA-Z0-9-_]+[a-zA-Z0-9]+)", CreateStoryHandler),
        (r"/createstory/([a-zA-Z0-9]+)", CreateStoryHandler),
    ])

if __name__ == "__main__":
    app = make_app()
    app.listen(8080)
    tornado.ioloop.IOLoop.current().start()