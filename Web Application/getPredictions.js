
changeText();

async function changeText() { 

    const data = await getData();

    document.getElementById('amazonValueText').innerHTML = data['Amazon'];
    document.getElementById('appleValueText').innerHTML = data['Apple'];
    document.getElementById('nikeValueText').innerHTML = data['Nike'];
    document.getElementById('googleValueText').innerHTML = data['Google'];
    document.getElementById('cocacolaValueText').innerHTML = data['Coca Cola'];

}


async function getData() { 

    var values = {'Apple':'', 'Amazon':'', 'Coca Cola':'', 'Nike':'', 'Google':''}

    const url = 'https://script.google.com/macros/s/AKfycbyy4VqvresH3StzSgdyCKBXY2u0Jepkgo0Mew0PytH6hMYZOauF2HFNH34jKGMnuXM6Aw/exec'
    const response = await fetch(url)
    .then(res => res.json())
    .then((out) => {
        responseData = out;
        console.log(responseData);
    })
    .catch(err => {throw err})

    dataLength = Object.keys(responseData["prices"]).length;

    var record = responseData["prices"];
    values['Apple'] = record[0]['value'];
    values['Amazon'] = record[1]['value'];
    values['Coca Cola'] = record[2]['value'];
    values['Nike'] = record[3]['value'];
    values['Google'] = record[4]['value'];

    console.log(values);

    return values;
 
}