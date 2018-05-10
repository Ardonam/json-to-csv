
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

function downloadClick()
{
	const items = jResponse.items
	const replacer = (key, value) => value === null ? '' : value // specify how you want to handle null values here
	const header = Object.keys(items[0])
	let csv = items.map(row => header.map(fieldName => JSON.stringify(row[fieldName], replacer)).join(','))
	csv.unshift(header.join(','))
	csv = csv.join('\r\n')
	var encodedUri = encodeURI(csv);
	var btn = document.getElementById("myButton");
	btn.setAttribute("href", encodedUri);

}

document.onreadystatechange = initializeWidget;
