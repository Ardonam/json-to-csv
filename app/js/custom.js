
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
		if (value == "[object Object]"){
			Object.entries(jn[key]).forEach(function ([k2, v2]) {
				if (v2 == "[object Object]"){
					Object.entries(jn[key][k2]).forEach(function ([k3, v3]) {
						if (v3 == "[object Object]"){
							Object.entries(jn[key][k2][k3]).forEach(function ([k4, v4]) {
								cv += k3 + "." + k4 + "," + v4 + "\r\n";

				    	});
						}
						else if (v3 == null || v3 == 0){
							// cv += k2 + "." + k3 + "," + "" + "\r\n";
						}
						else {
							cv += k2 + "." + k3 + "," + v3 + "\r\n";
						}
		    	});
				}
				else if (v2 == null || v2 == 0){
					// cv += key + "." + k2 + "," + "" + "\r\n";
				}
				else {
					cv += key + "." + k2 + "," + v2 + "\r\n";
				}
    	});

		}
		else if (value == null || value == 0){
			// pass
		}
		else {
			cv += key + "," + value + "\r\n";
		}
	});
	return cv
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
