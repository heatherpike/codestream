import pdb, sys
import sublime, sublime_plugin

menu_filename = "Main.sublime-menu"
menu = sublime.load_settings(menu_filename)
# run_command = menu[0]
# .children[0].caption
settings_filename = "codestream.sublime-settings"
on_modified_field = "codestream_on_modified"

settings = sublime.load_settings(settings_filename)


class CodestreamCommand(sublime_plugin.TextCommand):
	def run(self, edit): 
		print("run command")
		print(run_command)

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
		if settings.get(on_modified_field):
			print("$$$$$$$$$$")
			print(view.substr(sublime.Region(0, view.size())))
			print("$$$$$$$$$$")


