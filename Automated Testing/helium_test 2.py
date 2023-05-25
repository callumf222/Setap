from helium import *

start_firefox()
go_to("http://127.0.0.1:5500/Event%20App/HomePage.html")
click('+')
write('Get Bacon', into='Event Title')
write('Fill up the cart with eggs, bacon, bread and other food items for the week', into='Description')
click('Chores')
click('Reminder')
click('Save All')

click('+')
write('Go to work', into='Event Title')
write('Be ready to go to your job at 9pm!', into='Description')
click('Work')
click('Chores')
click('Reminder')
click('Save All')

click('Work')
click('Work')
click('Chores')
print('done')