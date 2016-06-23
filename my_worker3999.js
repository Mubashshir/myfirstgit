/*
*
*  Push Notifications codelab
*  Copyright 2015 Google Inc. All rights reserved.
*
*  Licensed under the Apache License, Version 2.0 (the "License");
*  you may not use this file except in compliance with the License.
*  You may obtain a copy of the License at
*
*      https://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing, software
*  distributed under the License is distributed on an "AS IS" BASIS,
*  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
*  See the License for the specific language governing permissions and
*  limitations under the License
*
*/

// Version 0.1

'use strict';

var website_id=  "188" 


console.log('Started', self);

self.addEventListener('install', function(event) {
  self.skipWaiting();
  console.log('Installed', event);
});

self.addEventListener('activate', function(event) {
  console.log('Activated', event);
});


self.addEventListener('push', function(event) {
  console.log('Push message', event); 
  
      event.waitUntil(       
        // https://api.myswaasth.com/api/conditions/
        // 'http://izootoapi.innotical.com/api/add_data/get_camp/?site_id='+website_id
          fetch('https://izootoapi.innotical.com/api/add_data/get_camp/?site_id='+website_id).then(function(response) { 
                return response.json().then(function(data) { 
                console.log("rrr"+JSON.stringify(data));
                    var title = data[0].title;  
                    var body = data[0].message; 
                    var icon = data[0].icon; 
                    var button_one_text=data[0].button1
                    var button_two_text=data[0].button2
                    var button_one_url=data[0].b_url1;
                    var button_two_url=data[0].b_url2;                    
                    var myurl=data[0].destination_url; 
                    
                    var myaction; 
                    
                    if(button_one_text=='' && button_two_text=='') {
                      myaction=[]
                    }
                    else if(button_one_text!='' && button_two_text!='') {
                      myaction= [
                                  {action: 'like', title: button_one_text},
                                  {action: 'reply', title: button_two_text}
                                ]
                    } 
                    else if(button_one_text!='' && button_two_text=='') {
                      myaction= [
                                  {action: 'like', title: button_one_text}
                                ]
                    }  
                    else if(button_one_text=='' && button_two_text!='') {
                      myaction= [
                                  {action: 'reply', title: button_two_text}
                                ]
                    }  
                    
                    return self.registration.showNotification(title, {  
                      body: body,  
                      icon: icon,  
                      tag: 'notificationTag'  ,
                      data: {
                                      url : myurl
                            },
                      actions: myaction
                    }); 
                    
                });  
          }).catch(function(err) {  
              console.log('Unable to retrieve data', err);

              var title = 'An error occurred';
              var body = 'We were unable to get the information for this push message';  
            
              return self.registration.showNotification(title, {  
                  body: body,  
                  icon: 'profile.png',  
                  tag: 'notificationTag'  ,
                  data: {
                                      url : "https://google.com"
                            }
                });  
            })  
      );   
});


self.addEventListener('notificationclick', function(event) {
//   console.log('Notification click: url', event.notification.data.url);   
  var url=event.notification.data.url;
  event.notification.close();  
  
  // new
  if (event.action === 'like') {  
    clients.openWindow(event.notification.button_one_url);  
  }  
  else if (event.action === 'reply') {  
    clients.openWindow(event.notification.button_two_url);  
  }  
  else {  
    clients.openWindow(url);  
  }  
  //end new
  
  
    // event.waitUntil(
    //     clients.matchAll({
    //       type: 'window'
    //     })
    //     .then(function(windowClients) {
    //       console.log('WindowClients', windowClients);
    //       for (var i = 0; i < windowClients.length; i++) {
    //         var client = windowClients[i];
    //         console.log('WindowClient', client);
    //         if (client.url === url && 'focus' in client) {
    //           return client.focus();
    //         }
    //       }
    //       if (clients.openWindow) {
    //         return clients.openWindow(url);
    //       }
    //     })
    // );
});
