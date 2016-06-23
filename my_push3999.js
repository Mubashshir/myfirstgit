var website_id=  "188" ;

var user_location={
    country:'',
    state:'',
    city:''
}

var user_device={
    device_type:'',
    device_os:'',
    device_browser:''
}

var user_subscription={
    subscription_id:'',
    p256dh:'',
    auth:''
}



    if ('serviceWorker' in navigator) {
      console.log('Service Worker is supported');
      navigator.serviceWorker.register('my_worker3999.js').then(initialiseState);
    }
    else {
        console.warn('Service workers aren\'t supported in this browser.');
    }


// Once the service worker is registered set the initial state
   function initialiseState() {
       // Are Notifications supported in the service worker?
       if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
           console.warn('Notifications aren\'t supported.');
           return;
       }
 
       // Check the current Notification permission.
       // If its denied, it's a permanent block until the user changes the permission
       if (Notification.permission === 'denied') {
           console.warn('The user has blocked notifications.');
           
           return;
       }
 
       // Check if push messaging is supported
       if (!('PushManager' in window)) {
           console.warn('Push messaging isn\'t supported.');
           return;
       }       
 
       // We need the service worker registration to check for a subscription
       navigator.serviceWorker.ready.then(function(serviceWorkerRegistration) {           
           serviceWorkerRegistration.pushManager.getSubscription()
            .then(function(subscription) {
                 if (subscription) {                                   
                    console.log("first sub : "+JSON.stringify(subscription));   
                    // console.log(subscription.getKey('p256dh')+ " , p256dh");     
                    return ;
                 }
                 else{
                     serviceWorkerRegistration.pushManager.subscribe({userVisibleOnly: true}).then(function(subscription) {
                            if (!subscription) {
                                console.log("second sub")
                                return;
                            }                           
                            sendSubscriptionIdToServer(subscription);
                        })
                        .catch(function(err) {
                            console.warn('Error during getSubscription()', err);                           
                        });
                 }
            });
           // Do we already have a push message subscription?           
       });
   }

   function sendSubscriptionIdToServer(subscription){     
          console.log("server sub")  
       var device_detail=getDeviceDetail(); 
       
       if(device_detail.OS.indexOf(' ')==-1){
           user_device.device_os=device_detail.OS;
       }
       else{
           user_device.device_os=device_detail.OS.substring(0,device_detail.OS.indexOf(' '));
       }
       
       if(device_detail.Browser.indexOf(' ')==-1){
           user_device.device_browser=device_detail.Browser;
       }
       else{
           user_device.device_browser=device_detail.Browser.substr(0,device_detail.Browser.indexOf(" "));         
       }
       
       if(device_detail.Mobile==0 || device_detail.Mobile==false){
           user_device.device_type="Desktop";
       }
       else{     
           var uwidth=Number.parseInt(device_detail.Screen_Size.substr(0,device_detail.Screen_Size.indexOf(" "))) ;
           var dwidth=700;
           if(uwidth<dwidth){
           user_device.device_type="Mobile";
           }
           else{
           user_device.device_type="Tablet";
           }
       }
      
       console.log(dwidth+uwidth+"sdfsdf , "+device_detail.Screen_Size.substr(0,device_detail.Screen_Size.indexOf(" "))+" ,"+device_detail.Screen_Size)
        
        
        if(user_device.device_browser=='Chrome'){
            var user_sub=subscription.endpoint.substring('https://android.googleapis.com/gcm/send/'.length);   
            console.log("chrome"+user_sub)   
        }
        else if(user_device.device_browser=='Firefox'){
            var user_sub=subscription.endpoint.substring('https://updates.push.services.mozilla.com/push/v1/'.length);  
            console.log("firefox"+user_sub)   
        }    
        
        var user_p256dh = subscription.getKey ? subscription.getKey('p256dh') : '';
        var user_auth = subscription.getKey ? subscription.getKey('auth') : '';
        
        user_subscription = {
            subscription_id: user_sub,
            p256dh: user_p256dh ? btoa(String.fromCharCode.apply(null, new Uint8Array(user_p256dh))) : '',
            auth: user_auth ? btoa(String.fromCharCode.apply(null, new Uint8Array(user_auth))) : '',
        };
        
        console.log('user sub'+JSON.stringify(user_subscription))    
                         
        $.getJSON('https://freegeoip.net/json/', function(data){           
            console.log(JSON.stringify(data)+" geo")            
            user_location.country=data.country_name;
            user_location.state=data.region_name;
            user_location.city=data.city;
            console.log(JSON.stringify(user_location) );
            postRequest(); 
        })   
      
       
       function postRequest() {
            
            var user_data={
                site_id:website_id,
                sub_id:user_subscription.subscription_id,
                p256dh:user_subscription.p256dh,
                auth:user_subscription.auth,                
                device_type :user_device.device_type,
                browser_type:user_device.device_browser,
                os:user_device.device_os,
                country:user_location.country,
                state:user_location.state,
                city:user_location.city
            }
            
            console.log("user data : "+JSON.stringify(user_data));
                       
            var xmlhttp = new XMLHttpRequest();
            var url = 'https://izootoapi.innotical.com/api/add_data/add_sub/';
            xmlhttp.open("POST", url, true);
            xmlhttp.setRequestHeader("Content-type", "application/json");
            xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
                if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                    // alert(xmlhttp.responseText);
                }
            }           
            xmlhttp.send(JSON.stringify(user_data));
             
       }
      
       
   }
   
    
  


/**
 * JavaScript Client Detection
 * (C) viazenetti GmbH (Christian Ludwig)
 */
function getDeviceDetail() {
    {
        var unknown = '-';

        // screen
        var screenSize = '';
        if (screen.width) {
            width = (screen.width) ? screen.width : '';
            height = (screen.height) ? screen.height : '';
            screenSize += '' + width + " x " + height;
        }

        // browser
        var nVer = navigator.appVersion;
        var nAgt = navigator.userAgent;
        var browser = navigator.appName;
        var version = '' + parseFloat(navigator.appVersion);
        var majorVersion = parseInt(navigator.appVersion, 10);
        var nameOffset, verOffset, ix;

        // Opera
        if ((verOffset = nAgt.indexOf('Opera')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 6);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Opera Next
        if ((verOffset = nAgt.indexOf('OPR')) != -1) {
            browser = 'Opera';
            version = nAgt.substring(verOffset + 4);
        }
        // MSIE
        else if ((verOffset = nAgt.indexOf('MSIE')) != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(verOffset + 5);
        }
        // Chrome
        else if ((verOffset = nAgt.indexOf('Chrome')) != -1) {
            browser = 'Chrome';
            version = nAgt.substring(verOffset + 7);
        }
        // Safari
        else if ((verOffset = nAgt.indexOf('Safari')) != -1) {
            browser = 'Safari';
            version = nAgt.substring(verOffset + 7);
            if ((verOffset = nAgt.indexOf('Version')) != -1) {
                version = nAgt.substring(verOffset + 8);
            }
        }
        // Firefox
        else if ((verOffset = nAgt.indexOf('Firefox')) != -1) {
            browser = 'Firefox';
            version = nAgt.substring(verOffset + 8);
        }
        // MSIE 11+
        else if (nAgt.indexOf('Trident/') != -1) {
            browser = 'Microsoft Internet Explorer';
            version = nAgt.substring(nAgt.indexOf('rv:') + 3);
        }
        // Other browsers
        else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
            browser = nAgt.substring(nameOffset, verOffset);
            version = nAgt.substring(verOffset + 1);
            if (browser.toLowerCase() == browser.toUpperCase()) {
                browser = navigator.appName;
            }
        }
        // trim the version string
        if ((ix = version.indexOf(';')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(' ')) != -1) version = version.substring(0, ix);
        if ((ix = version.indexOf(')')) != -1) version = version.substring(0, ix);

        majorVersion = parseInt('' + version, 10);
        if (isNaN(majorVersion)) {
            version = '' + parseFloat(navigator.appVersion);
            majorVersion = parseInt(navigator.appVersion, 10);
        }

        // mobile version
        var mobile = /Mobile|mini|Fennec|Android|iP(ad|od|hone)/.test(nVer);

        // cookie
        var cookieEnabled = (navigator.cookieEnabled) ? true : false;

        if (typeof navigator.cookieEnabled == 'undefined' && !cookieEnabled) {
            document.cookie = 'testcookie';
            cookieEnabled = (document.cookie.indexOf('testcookie') != -1) ? true : false;
        }

        // system
        var os = unknown;
        var clientStrings = [
            {s:'Windows 10', r:/(Windows 10.0|Windows NT 10.0)/},
            {s:'Windows 8.1', r:/(Windows 8.1|Windows NT 6.3)/},
            {s:'Windows 8', r:/(Windows 8|Windows NT 6.2)/},
            {s:'Windows 7', r:/(Windows 7|Windows NT 6.1)/},
            {s:'Windows Vista', r:/Windows NT 6.0/},
            {s:'Windows Server 2003', r:/Windows NT 5.2/},
            {s:'Windows XP', r:/(Windows NT 5.1|Windows XP)/},
            {s:'Windows 2000', r:/(Windows NT 5.0|Windows 2000)/},
            {s:'Windows ME', r:/(Win 9x 4.90|Windows ME)/},
            {s:'Windows 98', r:/(Windows 98|Win98)/},
            {s:'Windows 95', r:/(Windows 95|Win95|Windows_95)/},
            {s:'Windows NT 4.0', r:/(Windows NT 4.0|WinNT4.0|WinNT|Windows NT)/},
            {s:'Windows CE', r:/Windows CE/},
            {s:'Windows 3.11', r:/Win16/},
            {s:'Android', r:/Android/},
            {s:'Open BSD', r:/OpenBSD/},
            {s:'Sun OS', r:/SunOS/},
            {s:'Linux', r:/(Linux|X11)/},
            {s:'iOS', r:/(iPhone|iPad|iPod)/},
            {s:'Mac OS X', r:/Mac OS X/},
            {s:'Mac OS', r:/(MacPPC|MacIntel|Mac_PowerPC|Macintosh)/},
            {s:'QNX', r:/QNX/},
            {s:'UNIX', r:/UNIX/},
            {s:'BeOS', r:/BeOS/},
            {s:'OS/2', r:/OS\/2/},
            {s:'Search Bot', r:/(nuhk|Googlebot|Yammybot|Openbot|Slurp|MSNBot|Ask Jeeves\/Teoma|ia_archiver)/}
        ];
        for (var id in clientStrings) {
            var cs = clientStrings[id];
            if (cs.r.test(nAgt)) {
                os = cs.s;
                break;
            }
        }

        var osVersion = unknown;

        if (/Windows/.test(os)) {
            osVersion = /Windows (.*)/.exec(os)[1];
            os = 'Windows';
        }

        switch (os) {
            case 'Mac OS X':
                osVersion = /Mac OS X (10[\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'Android':
                osVersion = /Android ([\.\_\d]+)/.exec(nAgt)[1];
                break;

            case 'iOS':
                osVersion = /OS (\d+)_(\d+)_?(\d+)?/.exec(nVer);
                osVersion = osVersion[1] + '.' + osVersion[2] + '.' + (osVersion[3] | 0);
                break;
        }
        
        // flash (you'll need to include swfobject)
        /* script src="//ajax.googleapis.com/ajax/libs/swfobject/2.2/swfobject.js" */
        var flashVersion = 'no check';
        if (typeof swfobject != 'undefined') {
            var fv = swfobject.getFlashPlayerVersion();
            if (fv.major > 0) {
                flashVersion = fv.major + '.' + fv.minor + ' r' + fv.release;
            }
            else  {
                flashVersion = unknown;
            }
        }
    }

    window.jscd = {
        screen: screenSize,
        browser: browser,
        browserVersion: version,
        browserMajorVersion: majorVersion,
        mobile: mobile,
        os: os,
        osVersion: osVersion,
        cookies: cookieEnabled,
        flashVersion: flashVersion
    };
    
    return {
                'OS': jscd.os +' '+ jscd.osVersion ,
                'Browser':  jscd.browser +' '+ jscd.browserMajorVersion +
                ' (' + jscd.browserVersion + ')',
                'Mobile': + jscd.mobile ,
                'Flash': jscd.flashVersion ,
                'Cookies': + jscd.cookies ,
                'Screen_Size':  jscd.screen ,
                'Full User Agent ': navigator.userAgent
           };
    
};


 

   
   
   
   
   
  
