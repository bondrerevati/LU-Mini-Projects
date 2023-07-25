const table = document.getElementById("table");
let updateinfo = document.getElementsByClassName("updateinfo");
let updatePopup = document.getElementById("updatePopup");
let searchText = document.getElementById("search-input");
let row = 0;
let searchrows = [];
function edit(x) {
  updatePopup.style.display = "block";
  row = x;
  for (let i = 0; i < row.cells.length - 1; i++) {
    updateinfo[i].value = row.cells[i].textContent;
  }
}
function update() {
  for (let i = 0; i < row.cells.length - 1; i++) {
    row.cells[i].innerHTML = updateinfo[i].value;
  }
  updatePopup.style.display = "none";
}
function deleteRows(x) {
  table.deleteRow(x.rowIndex);
}
function closePopup() {
  updatePopup.style.display = "none";
}
function isPresent(obj, objArray) {
  for (let i = 0; i < objArray.length; i++) {
    if (obj === objArray[i]) return true;
  }
  return false;
}
function search() {
  let searchText = document.getElementById("search-input").value;
  if (searchText !== "") {
    searchrows = [];
    for (let i = 1; i < table.rows.length; i++) {
      for (let j = 0; j < table.rows[i].cells.length - 1; j++) {
        if (
          table.rows[i].cells[j].textContent
            .toUpperCase()
            .includes(searchText.toUpperCase())
        )
          if (searchrows.indexOf(table.rows[i]) === -1) searchrows.push(table.rows[i]);
      }
    }
    if (searchrows.length !== 0) {
      document.getElementById("error").innerHTML = "";
      for (let i = 1; i < table.rows.length; i++) {
        if (isPresent(table.rows[i], searchrows)) table.rows[i].style.display = "";
        else table.rows[i].style.display = "none";
      }
    } else {
      document.getElementById("error").innerHTML = "No results found!";
      for (let i = 1; i < table.rows.length; i++) {
        table.rows[i].style.display = "none";
      }
    }
  } else
    for (let i = 1; i < table.rows.length; i++) {
      table.rows[i].style.display = "";
      document.getElementById("error").innerHTML = "";
    }
}
