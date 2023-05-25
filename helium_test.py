from helium import *

start_firefox()
go_to("http://127.0.0.1:5500/Homepage/HomePage.html")
click('+')
write('Get Bacon', into='Event Title')
write('Fill up the cart with eggs, bacon, bread and other food items for the week', into='Description')
click('Chores')
click('Reminder')
click('Save All')
print("done")