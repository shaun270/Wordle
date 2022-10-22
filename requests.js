const wordFetch = async (url)=>{
    const response = await fetch(url);
    data = await response.json();
    // console.log(data[0]);
    word.push(...data[0].toUpperCase().split(''));
}

async function makeRequest(requestUrl){
    const response = await fetch(requestUrl);
    data = await response.json();
    stat = response.status;
    // if(!response.ok){
    //     // console.log('Failed to fetch :(', stat);
    // }
    // // else console.log('Victory!!!!', stat);
};