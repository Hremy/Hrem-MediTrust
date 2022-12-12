
export function isValidateEmail(email) {
    return String(email)
        .toLowerCase()
        .match(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
}

export function exportCSVUsers(jsonData, sheet) {

    let csvData = "Names, Role\n";

    csvData += JSON.parse(jsonData).map(function (data) {
            return data.names + "," + data.role;
        }
    ).join("\n");

    const blob = new Blob([csvData], { type: 'text/csv' });

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement('a')

    a.setAttribute('href', url)

    a.setAttribute('download', `${sheet}.csv`);

    a.click()

}
