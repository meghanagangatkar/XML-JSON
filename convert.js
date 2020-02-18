function xmlToJson(xml) {
	var obj = {};
	if (xml.nodeType == 1) { 
		if (xml.attributes.length > 0) {
		obj["@attributes"] = {};
			for (var j = 0; j < xml.attributes.length; j++) {
				var attribute = xml.attributes.item(j);
				obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
			}
		}
	} else if (xml.nodeType == 3) {
		obj = xml.nodeValue;
	}
	if (xml.hasChildNodes()) {
		for(var i = 0; i < xml.childNodes.length; i++) {
			var item = xml.childNodes.item(i);
			var nodeName = item.nodeName;
			if (typeof(obj[nodeName]) == "undefined") {
				obj[nodeName] = xmlToJson(item);
			} else {
				if (typeof(obj[nodeName].push) == "undefined") {
					var old = obj[nodeName];
					obj[nodeName] = [];
					obj[nodeName].push(old);
				}
				obj[nodeName].push(xmlToJson(item));
			}
		}
	}
	return obj;
};

 
   function ParseXML(val)
   {
       if (window.DOMParser)
         {
           parser=new DOMParser();
           xmlDoc=parser.parseFromString(val,"text/xml");
         }
       else
         {
           xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
           xmlDoc.loadXML(val);
         }
   return xmlDoc ;
   }
function JSONtoXML(obj) {
		var xml = '';
		for (var prop in obj) {
		  xml += obj[prop] instanceof Array ? '' : "<" + prop + ">";
		  if (obj[prop] instanceof Array) {
			for (var array in obj[prop]) {
			  xml += "<" + prop + ">";
			  xml += JSONtoXML(new Object(obj[prop][array]));
			  xml += "</" + prop + ">";
			}
		  } else if (typeof obj[prop] == "object") {
			xml += JSONtoXML(new Object(obj[prop]));
		  } else {
			xml += obj[prop];
		  }
		  xml += obj[prop] instanceof Array ? '' : "</" + prop + ">";
		}
		var xml = xml.replace(/<\/?[0-9]{1,}>/g, '');
		return xml;
	  }

	  function xToj(){
		//var xmlText = "<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>";
		var xmlInput=document.getElementById("xmlArea").value;
		//xmlInput = xmlInput.replace(/\s+/g, '');
		xmlInput = xmlInput.replace(/>\s*/g, '>'); 
		xmlInput = xmlInput.replace(/\s*</g, '<');
		if(xmlInput=='')alert("Empty Input!!")
		else{
		var xmlConverted=ParseXML(xmlInput);
		var jsonObj=xmlToJson(xmlConverted);
	    document.getElementById("jsonArea").value=JSON.stringify(jsonObj);
		console.log(xmlInput);
		console.log(xmlConverted);
		console.log(JSON.stringify(jsonObj)); 
		}
		}
	function jTox(){
		//var InputJSON = '{"employees":{"employee": [{ "name" : "john","age": "34"},{ "name" : "anna","age": "28"}]}}';
		var jsonInput=document.getElementById("jsonArea").value;
		if(jsonInput=='')alert("Empty Input!!")
		else{
		var InputJSON = JSON.parse(jsonInput);
		var xmlOutput = JSONtoXML(InputJSON);
		var output=parseXml(xmlOutput);
		document.getElementById("xmlArea").value=xmlOutput; 
		console.log(JSON.stringify(InputJSON)); 
		console.log(xmlOutput);
		console.log(output);
		}
	}
	
	function resetX()
	{
		document.getElementById("xmlArea").value='';
		
	}
	function resetJ()
	{
		document.getElementById("jsonArea").value='';
		
	}
	