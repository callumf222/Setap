from helium import *

start_chrome(maximize=True)
go_to("http://127.0.0.1:5500/CalendarPage/Setap-Calendar-Page/CalendarPage/calendarHTML.html")

click(S("#prev"))
click(S("#prev"))
click(S("#prev"))
click(S("#prev"))

click(S("#next"))
click(S("#next"))
click(S("#next"))
click(S("#next"))

click(Point(1492,151))
write("F")
click(Point(1533,150))
write("2018")

click(S("#dateSelecterBtn"))

print("done")