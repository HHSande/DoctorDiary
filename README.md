# DoctorDiary
README
FUNCTIONALITY

Doctors diary is an application that lets a doctor see his/her reports, both for previous and present days, and lets the District Health Officer see the reports of Doctors in the district. 

Doctors POV:  By clicking on a row in the table, one should be able to open a new report that lets the user read and change the report. The «Done» button in the new report will change the report status to completed and mark it as «Pending» while the «Close» button will leave the report status as «Unfinished». 

DHOs POV: The same thing as earlier with clicking on reports. But here the DHO will be able to Reject or Approve the reports. Can look for specific doctors by typing in the search bar. 

The user (both DHO and Doctor) can sort reports by date and by status; them being «UNFINISHED», «PENDING», «DECLINED» OR «APPROVED». They can also leave comments in the reports, as a way to communicate with each other. 

IMPLEMENTATION
There are two «main» files for the views, Searchbar.js and Oldreport.js, that the application revolves around. Because we re-used a lot of the code we decided to use only these files, and set functionality and views according to the users role. We fetch data for our components from the DHIS2 api and these are located in the Api.js file.
The reason why they’re called Searchbar and Oldreport is because those were the original names and we did not have the time to rename them and to regression testing. More appropriate names would be MainMenu instead of Searchbar and Report instead of Oldreport.

Since the data we fetch are not always organized the same way, we sort alphabetically after the dataValues[]. We filter «out» the reports that don’t have 7 objects in dataValues because otherwise the mapping won’t work and if a report have more or less the 7 dataValues something is incorrect with this report. When we create a new report we post it and then gives it 7 empty objects so the new report don’t get filtered out.

We also have code that lets the user know if their network connection is lost or if things are loading. 
 
MISSING/NOT WORKING PROPERLY/COULD BE BETTER
Our authorization in the headers in api.js is hardcoded. A better approach would be to make this dynamic. We could have modularized the architecture when working with the components of the application. Things like the search bar (the textfield) could look much more cleaner. 

BUG:
There is a bug where the list of reports won’t update after creating a new report, however the list will update after editing an existing report. A fix for this is to simply refresh the page after creating a new report. In other words, the API-calls work perfectly fine, but the error exists somewhere in the render or the logic related to the render.
