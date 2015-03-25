import pdb, sys
import sublime, sublime_plugin

menu_filename = "Main.sublime-menu"
settings_filename = "codestream.sublime-settings"
on_modified_field = "codestream_on_modified"

class CodestreamCommand(sublime_plugin.TextCommand):
	def run(self, edit): 
		settings = sublime.load_settings(settings_filename)

		if settings.get(on_modified_field):
			settings.set(on_modified_field, False)
			sublime.status_message("CodestreamCommand Turned Off")
			print("codestream off")
		else:
			settings.set(on_modified_field, True)
			sublime.status_message("CodestreamCommand Turned On")
			print("codestream on")

class MyEventListener(sublime_plugin.EventListener):	
	def on_modified_async(self, view):		
		print("$$$$$$$$$$")
		print(view.substr(sublime.Region(0, view.size())))
		print("$$$$$$$$$$")


