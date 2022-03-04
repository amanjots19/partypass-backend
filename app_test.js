var XLSX = require('xlsx')

var axios = require('axios')


var workbook = XLSX.readFile('Fiesta_2022.xlsx');
var sheet_name_list = workbook.SheetNames;
var xlData = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
// console.log(xlData);


let data = [
    {
        'S.No.': 1,
        Name: 'Amanjot Singh',
        Class: 'CSE-3',
        'Email id': 'singh.amanjot2000@gmail.com',
        'E.no.': 3376803121,
        'Contact no.': 8587020853,
        Payment: 'Paid(900)'
    },
    {
        'S.No.': 1,
        Name: 'Amanjot Singh',
        Class: 'CSE-3',
        'Email id': 'daman.bhatia46@gmail.com',
        'E.no.': 3376803121,
        'Contact no.': 8587020853,
        Payment: 'Paid(900)'
    },
    {
        'S.No.': 1,
        Name: 'Amanjot Singh',
        Class: 'CSE-3',
        'Email id': 'singhdeep6110@gmail.com',
        'E.no.': 3376803121,
        'Contact no.': 8587020853,
        Payment: 'Paid(900)'
    },
    {
        'S.No.': 1,
        Name: 'Amanjot Singh',
        Class: 'CSE-3',
        'Email id': 'gurnurkaur00@gmail.com',
        'E.no.': 3376803121,
        'Contact no.': 8587020853,
        Payment: 'Paid(900)'
    },
    {
        'S.No.': 1,
        Name: 'Amanjot Singh',
        Class: 'CSE-3',
        'Email id': 'snav.jot5454@gmail.com',
        'E.no.': 3376803121,
        'Contact no.': 8587020853,
        Payment: 'Paid(900)'
    },
    {
        'S.No.': 1,
        Name: 'Amanjot Singh',
        Class: 'CSE-3',
        'Email id': 'singhbrahmbind@gmail.com',
        'E.no.': 3376803121,
        'Contact no.': 8587020853,
        Payment: 'Paid(900)'
    },
]




function test() {
    data.forEach(async (dto) => {
        try {
            let body = {};
            body.name = dto.Name;
            body.email = dto['Email id'];
            body.contactNo = dto['Contact no.'];
            body.className = dto.Class;
            body.enrollmentNo = dto['E.no.'];

            var res = await axios.post(' https://passbackend.herokuapp.com/BookPass', body);
            console.log(res);
        }catch (e) {
            throw e
        }
    })
}

test();