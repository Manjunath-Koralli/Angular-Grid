import { Component } from "@angular/core";
import { Customer } from "./customer";
import { AllCommunityModules } from "@ag-grid-community/all-modules";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "Angular-Grid";

  private gridApi;
  private gridColumnApi;
  private columnDefs;
  private rowData;
  public id = 0;
  public tempId = 0;
  public btnVal = "Edit";
  custArray: Array<Customer> = new Array();
  getData: any[];

  model = new Customer(" ", 0);
  submitted = false;

  constructor() {
    this.columnDefs = [
      {
        headerName: "Name",
        field: "name",
        sortable: true,
        filter: true,
        checkboxSelection: true,
      },
      { headerName: "Age", field: "age", sortable: true, filter: true },
    ];

    this.rowData = [];
  }

  onSumbit() {
    this.submitted = true;
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  }

  createCustomer() {
    console.log("Customer creation");
    //this.custArray.push(new Customer(this.model.name,this.model.age));
    var newItem = this.createNewRowData();
    var res = this.gridApi.updateRowData({ add: [newItem] });
    this.printResult(res);
  }

  createNewRowData() {
    var newData = {
      id: this.id,
      name: this.model.name,
      age: this.model.age,
    };
    this.id++;
    return newData;
  }

  onRemoveSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var res = this.gridApi.updateRowData({ remove: selectedData });
    this.printResult(res);
  }

  updateSelected() {
    var selectedData = this.gridApi.getSelectedRows();
    var name = selectedData[0].name;
    var age = selectedData[0].age;
    var id = selectedData[0].id;
    this.model.name = name;
    this.model.age = age;
    this.id = id;
  }

  updRow() {
    var uData = [];
    var itemsToUpdate = [];
    var data = this.gridApi.getSelectedRows();
    uData = this.createUpdateData();
    data[0].name = uData[0];
    data[0].age = uData[1];
    itemsToUpdate.push(data);
    var res = this.gridApi.updateRowData({ update: itemsToUpdate });
    this.printResult(res);
  }

  createUpdateData() {
    var uData = [];
    uData[0] = this.model.name;
    uData[1] = this.model.age;
    return uData;
  }

  modules = AllCommunityModules;

  printResult(res) {
    if (res.add) {
      res.add.forEach(function (rowNode) {
        console.log("Added Row Node", rowNode);
      });
    }
    if (res.remove) {
      res.remove.forEach(function (rowNode) {
        console.log("Removed Row Node", rowNode);
      });
    }

    if (res.update) {
      res.update.forEach(function (rowNode) {
        console.log("Updated Row Node", rowNode);
      });
    }
  }
}
