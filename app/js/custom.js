
var jResponse;
function initializeWidget()
{
	/*
	 * initialize widget
	 */
	ZOHO.embeddedApp.init()
		/*
		 * fetch current users data
		 */
		.then(ZOHO.CRM.CONFIG.getCurrentUser)
		/*
		 * insert the response into the dom
		 */
		.then(function(response)
		{
			document.getElementById("userInfo").innerHTML = JSON.stringify(response,null,2);
		})
		/*
		 * fetch current record data
		 */
		.then(ZOHO.CRM.INTERACTION.getPageInfo)
		/*
		 * insert the response into the dom
		 */
		.then(function(response)
		{
			jResponse = response;
			document.getElementById("recordInfo").innerHTML = JSON.stringify(response,null,2);
		});

}


function convertToCSV(cv, jn) {

	Object.entries(jn).forEach(function ([key, value]) {
		if (Array.isArray(value)){
			var i;

			for(i = 0; i < value.length; i++){
				var subCv;
				var subObj = value[i];
				cv += convertToCSV(subCv, subObj);
			}
		}
		else if (value == "[object Object]"){

			Object.entries(jn[key]).forEach(function ([k2, v2]) {
				if (Array.isArray(v2)){
					var i;

					for(i = 0; i < v2.length; i++){
						var subCv;
						var subObj = v2[i];
						cv += convertToCSV(subCv, subObj);
						//cv += convertToCSV(cv, v2[i]);
					}
				}
				else if (v2 == "[object Object]"){
					Object.entries(jn[key][k2]).forEach(function ([k3, v3]) {
						if (Array.isArray(v3)){
							var i;

							for(i = 0; i < v3.length; i++){
								var subCv;
								var subObj = v3[i];
								cv += convertToCSV(subCv, subObj);
								//cv += convertToCSV(cv, v3[i]);
							}
						}
						else if (v3 == "[object Object]"){
							Object.entries(jn[key][k2][k3]).forEach(function ([k4, v4]) {
								var subCv;
								var subObj = v4;
								cv += convertToCSV(subCv, subObj);
				    	});
						}
						// else if (v3 == null || v3 == 0){
						// 	// cv += k2 + "." + k3 + "," + "" + "\r\n";
						// }
						else {
							cv += k2 + "." + k3 + "," + v3 + "\r\n";
							console.log(k3 + "  " + v3);
						}
		    	});
				}
				// else if (v2 == null || v2 == 0){
				// 	// cv += key + "." + k2 + "," + "" + "\r\n";
				// }
				else {
					cv += key + "." + k2 + "," + v2 + "\n";
					console.log(k2 + "  " + v2);
				}
    	});

		}
		// else if (value == null || value == 0){
		// 	// pass
		// }
		else {
			cv += key + "," + value + "\n";
			console.log(key + "  " + value);
		}
	});
	return cv
}

function convertToHTML(row1, row2, jn, iter) {
//
	Object.entries(jn).forEach(function ([key, value]) {
		if (Array.isArray(value)){
			var i;

			for(i = 0; i < value.length; i++){
				var subCv;
				var subObj = value[i];
				iter = convertToHTML(row1, row2, subObj, iter);
			}
		}
		else if (value == "[object Object]"){

			Object.entries(jn[key]).forEach(function ([k2, v2]) {
				if (Array.isArray(v2)){
					var i;

					for(i = 0; i < v2.length; i++){
						var subCv;
						var subObj = v2[i];
						iter = convertToHTML(row1, row2, subObj, iter);
						//cv += convertToCSV(cv, v2[i]);
					}
				}
				else if (v2 == "[object Object]"){
					Object.entries(jn[key][k2]).forEach(function ([k3, v3]) {
						if (Array.isArray(v3)){
							var i;

							for(i = 0; i < v3.length; i++){
								var subCv;
								var subObj = v3[i];
								iter = convertToHTML(row1, row2, subObj, iter);
								//cv += convertToCSV(cv, v3[i]);
							}
						}
						else if (v3 == "[object Object]"){
							Object.entries(jn[key][k2][k3]).forEach(function ([k4, v4]) {
								var subCv;
								var subObj = v4;
								iter = convertToHMTL(row1, row2, subObj, iter);
				    	});
						}
						// else if (v3 == null || v3 == 0){
						// 	// cv += k2 + "." + k3 + "," + "" + "\r\n";
						// }
						else {

							// cv += k2 + "." + k3 + "," + v3 + "\r\n";
							cell = row1.insertCell(iter);
							cell.innerHTML = k3 ;
							cell = row2.insertCell(iter);
							cell.innerHTML = v3 ;
							iter = iter + 1;
							console.log(k3 + "  " + v3 + " " + iter.toString());
						}
		    	});
				}
				// else if (v2 == null || v2 == 0){
				// 	// cv += key + "." + k2 + "," + "" + "\r\n";
				// }
				else {
					// cv += key + "." + k2 + "," + v2 + "\n";
					cell = row1.insertCell(iter);
					cell.innerHTML = k2 ;
					cell = row2.insertCell(iter);
					cell.innerHTML = v2 ;
					iter = iter + 1;
					console.log(k2 + "  " + v2 + " " + iter.toString());
				}
    	});

		}
		// else if (value == null || value == 0){
		// 	// pass
		// }
		else {
			// cv += key + "," + value + "\n";
			cell = row1.insertCell(iter);
			cell.innerHTML = key ;
			cell = row2.insertCell(iter);
			cell.innerHTML = value;
			iter = iter + 1;
			console.log(key + "  " + value + " " + iter.toString());
		}
	});
	return iter
}

function makeDocument()
{
	var doc = document.implementation.createHTMLDocument("New Document");
	var table = doc.createElement("table");
	var key = table.insertRow(0);
	var val = table.insertRow(1);
	// var cell = row.insertCell(0);
	// cell.innerHTML = "This is a new paragraph.";
	// var cell = row.insertCell(1);
	// cell.innerHTML = "This is a new paragraph.";


	convertToHTML(key, val, jResponse, 0);
	// csvContent = csvContent.replace("#", ""); // remove # cuz they cause problem in the file
	try {
		doc.body.appendChild(table);
	} catch(e) {
		console.log(e);
	}

	docString = "data:text/html;charset=utf-8," + '<html>'+doc.documentElement.innerHTML+'</html>';
	docString = docString.replace("#", ""); // remove # cuz they cause problem in the file
	var encodedUri = encodeURIComponent(docString);
	var btn = document.getElementById("myButton2");
	btn.setAttribute("href", docString);

}

function downloadClick()
{
	jResponse = {
  "entity": "Quotes",
  "data": {
    "Owner": {
      "name": "Eric Norman ",
      "id": "3187579000000152015"
    },
    "Discount": 0,
    "Description": null,
    "$currency_symbol": "$",
    "Shipping_State": null,
    "Tax": 0,
    "Modified_By": {
      "name": "Eric Norman ",
      "id": "3187579000000152015"
    },
    "$converted": false,
    "$process_flow": false,
    "Deal_Name": null,
    "Valid_Till": null,
    "Billing_Country": "Baltimore City",
    "Team": null,
    "Account_Name": {
      "name": "King",
      "id": "3187579000000155088"
    },
    "id": "3187579000000153739",
    "Carrier": "FedEX",
    "$approved": true,
    "Quote_Stage": "Draft",
    "Grand_Total": 0,
    "$approval": {
      "delegate": false,
      "approve": false,
      "reject": false,
      "resubmit": false
    },
    "Modified_Time": "2018-04-30T13:50:30-07:00",
    "Billing_Street": "228 Runamuck Pl #2808",
    "Adjustment": 0,
    "Created_Time": "2018-04-30T13:50:29-07:00",
    "Terms_and_Conditions": null,
    "$followed": false,
    "Sub_Total": 0,
    "$editable": true,
    "Billing_Code": null,
    "Product_Details": [
      {
        "product": {
          "Product_Code": null,
          "name": "123",
          "id": "3187579000000161122"
        },
        "quantity": 1,
        "Discount": 0,
        "total_after_discount": 0,
        "net_total": 0,
        "book": null,
        "Tax": 0,
        "list_price": 0,
        "unit_price": 0,
        "quantity_in_stock": 0,
        "total": 0,
        "id": "3187579000000153741",
        "product_description": null,
        "line_tax": []
      }
    ],
    "Auto_Number": "21",
    "Subject": "18043001",
    "Contact_Name": null,
    "Shipping_City": null,
    "Shipping_Country": null,
    "Shipping_Code": null,
    "Billing_City": "Baltimore",
    "Quote_Number": "18043001",
    "$status": "cmv_1-2",
    "Billing_State": "MD",
    "$line_tax": [
      {
        "percentage": 0,
        "name": "Sales Tax",
        "value": 0
      },
      {
        "percentage": 0,
        "name": "Vat",
        "value": 0
      }
    ],
    "Created_By": {
      "name": "Eric Norman ",
      "id": "3187579000000152015"
    },
    "Tag": [],
    "Shipping_Street": null
  }
}

	// const items = jResponse.items;
	// const replacer = (key, value) => value === null ? '' : value ;// specify how you want to handle null values here
	// const header = Object.keys(items[0]);
	// let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','));
	// csv.unshift(header.join(','));
	// csv = csv.join('\r\n');
  //
	// var encodedUri = encodeURI(csv);
	// var btn = document.getElementById("myButton");
	// btn.setAttribute("href", encodedUri);

	// document.getElementById("userInfo").innerHTML = JSON.stringify(jResponse,null,2);

	// const rows = [["name1", "city1", "some other info"], ["name2", "city2", "more info"]];
	// let csvContent = "data:text/csv;charset=utf-8,";
	// rows.forEach(function(rowArray){
	// 	 let row = rowArray.join(",");
	// 	 csvContent += row + "\r\n";
	// });




	let csvContent = "data:text/csv;charset=utf-8,";

	csvContent = convertToCSV(csvContent, jResponse);
	csvContent = csvContent.replace("#", ""); // remove # cuz they cause problem in the file


	// Object.entries(jResponse).forEach(function ([key, value]) {
	// 	if (value == "[object Object]"){
	// 		csvContent += key + "," + "!!!" + "\r\n";
	// 	}
	// 	else if (value == null){
	// 		csvContent += key + "," + "" + "\r\n";
	// 	}
	// 	else {
	// 		csvContent += key + "," + value + "\r\n";
	// 	}
	// });



	var encodedUri = encodeURI(csvContent);
	var btn = document.getElementById("myButton");
	btn.setAttribute("href", encodedUri);

}



document.onreadystatechange = initializeWidget;
