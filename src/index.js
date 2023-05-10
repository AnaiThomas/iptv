// modificaciones


//
// ** global variables
let table1 = false;
let table2 = false;
let table3 = false;
let table5 = false;
let table0501c = false;
let saveData = {};
let expedienteAnterior = false;
let expedienteSiguiente = false;
let clipboardCopied = false;
let clipboardOld = false;

let exportTitle = "Seguimiento de Expedientes";

let tableObject;
let tableExportTitle;
let tableExportName;

let loaderStatus = true;

//agregado el 2021-07-09
// controles del asistente visual
let cav, fo;
let currentControl,
  currentField,
  currentType,
  dropDown = false;

// tabulator
let lineFormatter = function (cell, formatterParams, onRendered) {
  onRendered(function () {
    //instantiate sparkline after the cell element has been aded to the DOM
    $(cell.getElement()).sparkline(cell.getValue(), {
      width: "100%",
      type: "line",
      disableTooltips: true,
    });
  });
};

let saveButton =
  '<button type="button"  ' +
  '  class="btn btn-success btn-sm tabulator-footer b3Save" ' +
  '  onClick="saveCells3();"  ' +
  '  title="Guardar cambios realizados a este expediente"> ' +
  '  <i class="fas fa-save"></i> Guardar Cambios' +
  "</button>";
+" &nbsp&nbsp&nbsp";

saveButton +=
  '<button type="button"  ' +
  '  class="btn btn-danger btn-sm tabulator-footer b3Cancel" ' +
  '  onClick="cancelCells3();"  ' +
  '  title="Cancelar cambios realizados a este expediente"> ' +
  '  <i class="fas fa-save"></i> Cancelar Cambios' +
  "</button>";
+" &nbsp&nbsp&nbsp";

let CustomButtons =
  '<button type="button"  ' +
  '  class="btn btn-info btn-sm tabulator-footer bToExcel" ' +
  '  onClick="exportExcel();"  ' +
  '  title="Exportar a Excel"> ' +
  '  <i class="fas fa-file-excel"></i> Exportar a Excel' +
  "</button>";
CustomButtons += "&nbsp&nbsp&nbsp";
CustomButtons +=
  '<button type="button"  ' +
  ' class="btn tabulator-footer  btn-info btn-sm bToPdf" ' +
  ' onClick="exportPdf();"  ' +
  ' title="Exportar a PDF">' +
  '  <i class="fas fa-file-pdf"></i> Exportar a PDF' +
  "</button>&nbsp&nbsp&nbsp";

CustomButtons = ""; // se deshabilitan por ahora los botones de exportacion

let caMoneda = function (value, data, type, params, column) {
  return numeral(value).format("$ 0,0");
};

let caPorcentaje = function (value, data, type, params, column) {
  return numeral(value).format("0.0%");
};

let totalCalc = function (values, data, calcParams) {
  return "Total General";
};

let wrFormatNumber = {
  decimal: ",",
  thousand: ".",
  symbol: "",
  symbolAfter: false,
  precision: 0,
};

// agregados el 2022-03-06
let caMoneda2 = function (value, data, type, params, column) {
  return numeral(value).format("0.00");
};
let ad2 = function (value, data, type, params, column, row) {
  return Number(value);
};
let adConcepto = function (value, data, type, params, column, row) {
  return tabulatorSelectors.concepto[value];
};
let adPlan = function (value, data, type, params, column, row) {
  return tabulatorSelectors.plan[value];
};
let wrFormatNumber2 = {
  decimal: ".",
  thousand: ",",
  symbol: "",
  symbolAfter: false,
  precision: 2,
};

//Create Date Editor
//
// OJO pendiente de resolver, primero en modo pristine

//Process 3
let matrix = false;
let counterEE = 0;
let hoy = moment().format("YYYY-MM-DD");

//p0511m
let selectedPlan = 0;
let re46 = false;

// Custom documment ready
async function documentReady() {
  // Jquery document.ready
  $(function () {
    // autoexec
    //
    if (loaderStatus) {
      // global config
      numeral.locale("es-es");
      moment.locale("es-us");

      $("input[title='Importe' ]").inputmask({
        alias: "currency",
        greedy: true,
        autoUnmask: true,
      });

      $(".datepicker").datepicker({
        format: "yyyy-mm-dd",
        todayBtn: "linked",
        language: "es",
        autoclose: true,
        todayHighlight: true,
        assumeNearbyYear: true,
        clearBtn: true,
        endDate: "0d",
        zIndexOffset: 8000,
      });

      // const fecha = new Date(moment().subtract(7, 'days')) ;

      if (thisPage == "p0511m" || thisPage == "p0511c") {
        $("#t3Dependencia option").each(function (i) {
          $(this).removeAttr("disabled");
        });

        $("[multiple=multiple]").multiselect(bms_multiple);
        $("[unique=true]").multiselect(bms_multiple_unique);

        _.each($("[multiple=multiple]"), function (selectData, index) {
          switch ($(selectData).attr("data-AllSelected")) {
            case "false":
              // no hace nada
              break;
            case "ogDependencia":
              // modificado el 2022-04-25
              // por ahora se seleccionan todos por default
              // se preseleccionan solo los abiertos
              let abiertos = [];
              _.each(selectData, function (selectOption, idx) {
                if ($(selectOption).attr("orden") < 100) {
                  abiertos.push($(selectOption).val());
                }
              });
              $(selectData).multiselect("select", abiertos);

              //
              // $(selectData).multiselect('selectAll', false);
              break;
            default:
              $(selectData)
                .multiselect("selectAll", false)
                .multiselect("updateButtonText");
              break;
          }
        });
      }

      const fecha = new Date(moment().subtract(7, "days"));

      $(".datepickerLimited").datepicker({
        format: "yyyy-mm-dd",
        todayBtn: "linked",
        language: "es",
        autoclose: true,
        // todayHighlight   : true,
        defaultViewDate: fecha,
        assumeNearbyYear: true,
        clearBtn: true,
        endDate: "0d",
        zIndexOffset: 8000,
      });

      $(".datepickerLimited").datepicker("update", fecha);

      // agregado 2020-11-23
      $(".datepickerMonth").datepicker({
        format: "yyyy-mm-dd",
        todayBtn: "linked",
        language: "es",
        autoclose: true,
        // todayHighlight   : true,
        defaultViewDate: fecha,
        assumeNearbyYear: true,
        clearBtn: true,
        endDate: "0m",
        minViewMode: 1,
        zIndexOffset: 8000,
      });

      $("#b01").click(function () {
        doTable1();
      });
      $("#b02").click(function () {
        if (false === table2) {
          doTable2("create");
        } else {
          // table2.redraw(true);
          doTable2("update");
        }
      });
      $("#b03").click(function () {
        // $('#b03').blur();
        doProcess3("create");
      });

      $("#b03b").click(function () {
        //$('#b03b').blur();
        doProcess3("save");
      });
      $("#b03c").click(function () {
        //$('#b03c').blur();
        showEE("prev");
      });
      $("#b03d").click(function () {
        // $('#b03d').blur();
        showEE("next");
      });
      $("#b03e").click(function () {
        //$('#b03e').blur();
        showEE("nextAndMark");
      });
      $("#b03f").click(function () {
        // agregado el 2021-10-24
        // chequea si hay cambios sin guardar
        showFilters();

        // $('#b03f').blur();
        // $('.filtros').show();
        // $('.f3Show').addClass('f3Hide');
        // $('.f3Hide').removeClass('f3Show');
      });

      $(".b03n").click(function () {
        //$('#b03n').blur();
        doProcess3("modal", this.id);
      });

      $("#mb03Cancel").click(function () {
        $.unblockUI();
      });

      $("#mb03Save").click(function () {
        doProcess3("modalSave");
      });

      // eventos controles del formulario p0511m
      //

      $("#b04Save").click(function () {
        doP0511("save");
      });

      $("#b04Paste").click(function () {
        doP0511("reuse");
      });

      $("#b04Cancel").click(function () {
        doP0511("cancel");
      });

      $("#t4Concepto").change(function () {
        foo = populatePlan("#t4Plan", $(this).val());
      });

      $("#t4Plan").change(function () {
        foo = planChange($(this).val());
      });

      // eventos controles del formulario r0511a
      //

      let clipboard = new ClipboardJS(".clipboardEE", {
        // container: document.getElementById('modalF0511')       // hace falta si es modal ???
      });

      clipboard.on("success", function (e) {
        // console.info('texto copiado: ' + e.text);
        e.clearSelection();
        if (
          e.trigger.id != "b03d" &&
          e.trigger.id != "b03c" &&
          e.trigger.id != "b03e"
        ) {
          ShowNotyPopUp(
            "texto copiado al Portapapeles: " + e.text,
            "ok_fast",
            "center"
          );
        } else {
          clipboardCopied = true;
          $("#b03c").attr("data-clipboard-text", expedienteAnterior);
          $("#b03d").attr("data-clipboard-text", expedienteSiguiente);
          $("#b03e").attr("data-clipboard-text", expedienteSiguiente);
        }
      });
      clipboard.on("error", function (e) {
        e.clearSelection();
        ShowNotyPopUp(
          "Error copiando el texto al Portapapeles",
          "error",
          "center"
        );
      });

      switch (thisPage) {
        case "p0501a":
          doTable1("create");
          break;
        case "p0501c":
          // agregado el 2021-11-25 - limitativo
          $("#cbLimitativo").bootstrapToggle();

          // incializacion Concepto y Plan
          $("#con_d").change(function () {
            foo = populatePlan("#pla_d", $(this).val(), true);
          });

          bms_0501c = {
            maxHeight: 350,
            buttonTextAlignment: "left", //no anda
            buttonWidth: "100%",
            disableIfEmpty: true,
            disabledText: "No Disponible ...",
            includeSelectAllOption: true,
            selectAllText: " Seleccionar Todos",
            selectAllJustVisible: false, // modificado 2021-01-13
            selectAllValue: 0,
            onSelectAll: function () {
              this.$button.click();
            },
            enableClickableOptGroups: true,
            enableCollapsibleOptGroups: true,
            collapseOptGroupsByDefault: true,
            filterPlaceholder: "Buscar",
            enableFiltering: true,
            enableCaseInsensitiveFiltering: true,
            includeResetOption: true,
            includeResetDivider: true,
            resetText: "Cancelar Selección",
            buttonText: function (options, select, numberDisplayed = 3) {
              const total = select[0].length;
              if (options.length === 0) {
                return "Nada Seleccionado ...";
              } else if (options.length == total) {
                return "Todos seleccionados! (" + total + " )";
              } else if (options.length > numberDisplayed) {
                return "Seleccionados: " + options.length + " de " + total;
              } else {
                var labels = [];
                options.each(function () {
                  if ($(this).attr("label") !== undefined) {
                    labels.push($(this).attr("label"));
                  } else {
                    labels.push($(this).html());
                  }
                });
                return labels.join(", ") + "";
              }
            },
          };

          $("#con_d").multiselect(bms_0501c);
          $("#pla_d").multiselect(bms_0501c);
          $("#sec_d").multiselect(bms_0501c);
          $("#sub_d").multiselect(bms_0501c);

          foo = populatePlan("#pla_d", [], true);

          // eventos de los controles input

          cav = {
            con: { label: "Concepto", av: false },
            pla: { label: "Plan", av: false },
            sec: { label: "Sector", av: false },
            sub: { label: "Sub Sector", av: false },
            jur: { label: "Jurisdicción", av: true },
            saf: { label: "SAF", av: true },
            pg_: { label: "Programa", av: true },
            sp_: { label: "Sub Programa", av: true },
            py_: { label: "Proyecto", av: true },
            ac_: { label: "Actividad", av: true },
            ob_: { label: "Obra", av: true },
            inc: { label: "Inciso", av: true },
            pri: { label: "Principal", av: true },
            par: { label: "Parcial", av: true },
            sup: { label: "Sub Parcial", av: true },
            fue: { label: "Fuente Finan.", av: true },
            eco: { label: "Clasif. Econ.", av: true },
            ubi: { label: "Ubicación Geog.", av: true },
            bap: { label: "Cod. BAPIN", av: false },
            pex: { label: "Cod. Préstamo Externo", av: false },

            _values: {},
          };

          $(".wrFilter").change(function () {
            let bkg = "#fff";
            try {
              if (
                false === dropDown &&
                this.type != "checkbox" &&
                false === _.contains(["e", "i"], _right(this.id, 1)) &&
                true === cav[_left(this.id, 3)].av
              ) {
                let valueOk = this.value;
                let newTitle = "";
                let newPrefix = "";
                if (valueOk) {
                  if (_right(this.id, 1) == "m") {
                    valueOk = valueOk.replace(/;/g, ",");
                    valueOk = valueOk.replace(/-/g, ",");
                    valueOk = valueOk.replace(/\./g, ",");
                    valueOk = _trim(valueOk);
                    this.value = valueOk;
                    if (!/^[0-9,]+$/.test(valueOk)) {
                      bkg = "#F8F78A";
                      throw "Por favor ingrese solo numeros separados por comas";
                    } else {
                      // compone el title del campo
                      let newValue = valueOk.split(",");
                      _.each(newValue, function (data, index) {
                        newPrefix = newTitle
                          ? " , "
                          : cav[currentField].label + ": ";
                        newTitle += newPrefix;

                        if (f0593_cod[currentField].hasOwnProperty(data)) {
                          newTitle +=
                            f0593[f0593_cod[currentField][data]].label;
                        } else {
                          newTitle += "No Existe (" + data + ")";
                        }
                      });
                    }
                  } else {
                    newTitle = cav[currentField].label + ": ";
                    if (f0593_cod[currentField].hasOwnProperty(valueOk)) {
                      newTitle += f0593[f0593_cod[currentField][valueOk]].label;
                    } else {
                      newTitle += "No Existe (" + valueOk + ")";
                    }
                  }

                  // pendiente
                  // $('#' + cav.__extra.currentControl ).val( newData );
                  $("#" + currentControl).prop("title", newTitle);
                }
              } else {
                // si se actualizo desde el dropdown, no hace nada
                // solo se blanquea el flag
                dropDown = false;
              }
            } catch (catchMsg) {
              showNotyPopup(
                "onChange: " + catchMsg.toString(),
                "warning",
                "center"
              );
            } finally {
              if (this.id) {
                $("#" + this.id).css("background-color", bkg);
              }
            }
          });

          // $("select,input").focus(function(){
          $(".wrFilter").focus(function () {
            let prefix = _left(this.id, 3);
            let disableAV = true;
            if (false == _.contains(["con", "pla", "sub", "sec"], prefix)) {
              if (cav.hasOwnProperty(prefix)) {
                if (
                  cav[prefix].av &&
                  false == _.contains(["e", "i"], _right(this.id, 1))
                ) {
                  // quita el fondo del control anterior y cambio el fondo de este control
                  if (currentControl) {
                    $("#" + currentControl).css("background-color", "#fff");
                  }
                  $("#" + this.id).css("background-color", "#75AFF7");

                  // determina si el asistente visual sera multiple o no
                  let subfix = _right(this.id, 1);
                  if (subfix == "m") {
                    $("#multiSelect").attr("multiple", "multiple");
                  } else {
                    $("#multiSelect").removeAttr("multiple");
                  }
                  // rehace el asistente visual con los datos del campo enfocado
                  $("#multiSelect").multiselect("rebuild");
                  $("#multiSelect").multiselect(
                    "dataprovider",
                    f0593_av[prefix]
                  );

                  // selecciona los valores existentes en el campo enfocado
                  let newList;
                  if (this.value) {
                    if (subfix == "m") {
                      let newValue = _trim(this.value);
                      newList = newValue.split(",");
                    } else {
                      newList = [this.value];
                    }
                  }
                  _.each(newList, function ($cod, index) {
                    if (f0593_cod[prefix].hasOwnProperty($cod)) {
                      $("#multiSelect").multiselect(
                        "select",
                        f0593_cod[prefix][$cod]
                      );
                    }
                  });

                  // habilita el asistente visual
                  disableAV = false;
                  // guarda las referencias del control enfocado
                  currentControl = this.id;
                  // cav.__extra.currentField   = _left(this.id , 3);
                  currentField = prefix;
                  // cav.__extra.currentType    = _right(this.id , 1);
                  currentType = subfix;
                }
              }
            }
            if (disableAV) {
              $(".multiSelectHider").addClass("d-none");
            } else {
              $("#asistenteVisual").text(cav[prefix].label);
              $(".multiSelectHider").removeClass("d-none");
            }
          });

          // habilita el control de multiSelect
          bms_multiple.onSelectAll = function (option, checked, select) {
            multipleSelectChange(option, checked, select);
          };

          bms_multiple.onChange = function (option, checked, select) {
            multipleSelectChange(option, checked, select);
          };

          $("#multiSelect").multiselect(bms_multiple);

        // a proposito no se pone el break
        // para que siga ejecutando el codigo de mas abajo
        // break;
        case "p0511n":
        case "p0511c":
        case "p0501b":
          // botones de p0501c
          $("#c01").click(function () {
            // buscar y mostrar resultados
            //$('#botones01').addClass('d-none');
            $(".botones01").addClass("d-none");
            $("#botones02").removeClass("d-none");
            $("#wrFiltros").addClass("d-none");

            // creo o actualiza tabulator
            if (false === table0501c) {
              foo = doTable0501c("create");
            } else {
              foo = doTable0501c("update");
            }
          });

          $("#c02").click(function () {
            // volver a ver Filtros
            ///$('#botones01').removeClass('d-none');
            $(".botones01").removeClass("d-none");
            $("#botones02").addClass("d-none");
            // $('#c01').removeClass('d-none');
            // $('#c04').removeClass('d-none');

            // $('#c02').addClass('d-none');
            // $('#c03').addClass('d-none');
            $("#wrFiltros").removeClass("d-none");
            $("#Tabulator01c").addClass("d-none");
          });

          $("#c03").click(function () {
            // abre las opciones de Excel
            $("#botones02").addClass("d-none");
            // $('#c02').addClass('d-none');
            // $('#c03').addClass('d-none');
            $("#Tabulator01c").addClass("d-none");
            $("#wrExcelExport").removeClass("d-none");
          });

          $("#c04").click(function () {
            // $("select", "#wrFiltros").val(0);
            foo = populatePlan("#pla_d", [], true);
            $("#con_d").multiselect("deselectAll", false);
            $("#con_d").multiselect("updateButtonText");
            $("#sec_d").multiselect("deselectAll", false);
            $("#sec_d").multiselect("updateButtonText");
            $("#sub_d").multiselect("deselectAll", false);
            $("#sub_d").multiselect("updateButtonText");
            $("input", "#wrFiltros").val("");
          });

          $("#c05").click(function () {
            $("#modalSave").modal("show");
          });

          $("#c06").click(function () {
            $("#modalTree").modal("show");
          });

          $("#c31").click(function () {
            // genera el reportes
            foo = toExcel0501c();
          });

          $("#c32").click(function () {
            // cancela reporte
            $("#wrExcelExport").addClass("d-none");
            $("#botones02").removeClass("d-none");
            $("#Tabulator01c").removeClass("d-none");
          });

          $("#op2_All").click(function () {
            // marca todas las opciones de la pestaña Opciones Avanzadas
            $("#table_op2")
              .find(":checkbox")
              .each(function () {
                if (
                  "i" == _right(this.id, 1) &&
                  false == $(this).is(":checked") &&
                  false == $(this).is(":disabled")
                ) {
                  this.checked = true;
                }
              });
          });
          $("#op2_None").click(function () {
            // marca todas las opciones de la pestaña Opciones Avanzadas
            let id;
            $("#table_op2")
              .find(":checkbox")
              .each(function () {
                if (
                  "i" == _right(this.id, 1) &&
                  true == $(this).is(":checked") &&
                  false == $(this).is(":disabled")
                ) {
                  this.checked = false;
                }
              });
          });
          $("#op3_All").click(function () {
            // marca todas las opciones de la pestaña Opciones Avanzadas
            $("#table_op3")
              .find(":checkbox")
              .each(function () {
                if (
                  "i" == _right(this.id, 1) &&
                  false == $(this).is(":checked") &&
                  false == $(this).is(":disabled")
                ) {
                  this.checked = true;
                }
              });
          });
          $("#op3_None").click(function () {
            // marca todas las opciones de la pestaña Opciones Avanzadas
            let id;
            $("#table_op3")
              .find(":checkbox")
              .each(function () {
                if (
                  "i" == _right(this.id, 1) &&
                  true == $(this).is(":checked") &&
                  false == $(this).is(":disabled")
                ) {
                  this.checked = false;
                }
              });
          });

          // poner blanco todos los input
          // OJO revisar si es necesario doP0511('blank');

          foo = populatePlan("#t4Plan", $("#t4Concepto").val());
          break;
      }
    } // end autoexec                  ------------------------
  }); // end Jquery Document Ready     ------------------------
  return true;
} // end Custom Document Ready     ------------------------

async function showFilters() {
  let rv = true;
  let pm = false; // pending modifications

  // solo valida si estga habiltiado el boton de guardar
  if (false === $("#b03b").hasClass("d-none")) {
    const editedCells = table3.getEditedCells();
    if (editedCells.length > 0) {
      pm = true;
      // showNotyPopup('Hay datos de la grilla sin guardar. Verificalo antes de cambiar de expediente', 'warning', 'center');
      // return false;
    }
    const changes = await checkChanges(true);
    if (false === changes.status) {
      pm = true;
      //showNotyPopup('Hay datos del formulario sin guardar. Verificalo antes de cambiar de expediente', 'warning', 'center');
      //return false;
    }
  }

  if (true === pm) {
    var n = new Noty({
      theme: notyTheme,
      layout: "center",
      modal: true,
      text:
        "hay modificaciones sin guardar" +
        "<br>" +
        "Confirma salir y perder los cambios?",
      buttons: [
        Noty.button("No", "btn btn-outline-danger btn-sm ", function () {
          rv = false;
          n.close();
        }),
        Noty.button("Si", "btn btn-outline-success  btn-sm", function () {
          $(".filtros").show();
          $(".f3Show").addClass("f3Hide");
          $(".f3Hide").removeClass("f3Show");
          n.close();
        }),
      ],
    }).show();
  } else {
    $(".filtros").show();
    $(".f3Show").addClass("f3Hide");
    $(".f3Hide").removeClass("f3Show");
  }

  return rv;
}

function hideAll() {
  $("body").addClass("loaded");
  $("#mainContainer").hide();
  notyPopup("error en carga inicial de datos", "errorModal");
  loaderStatus = false;
} // end hideAll

async function exportExcel() {
  tableObject.download("xlsx", tableExportTitle + ".xlsx", {
    sheetName: "Data",
    title: tableExportTitle, //add title to report
  });
}

async function exportPdf() {
  tableObject.download("pdf", tableExportTitle + "subsidiosGas.pdf", {
    orientation: "portrait", //set page orientation // portrait - landscape
    title: tableExportTitle, //add title to report
  });
}

async function doTable1(action = "update") {
  const postParam = {
    action: "table1",
  };
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postParam),
    cache: "no-cache",
  };
  const dataResponse = await fetch("/ajax/A05.php", options);
  const dataJson = await dataResponse.json();
  if (dataJson.status != "ok") {
    dataJson.data = [];
    const errorMsg =
      "Error al traer datos del servidor: " + "\n" + dataJson.msg;
    showNotyPopup(errorMsg, "errorModal");
  }

  if (table1 == false) {
    let tableH = window.innerHeight - 100 + "px";

    table1 = new Tabulator("#Tabulator1", {
      // height:"400px",
      height: "tableH",
      data: dataJson.data,
      layout: "fitDataFill", // fitData  fitColumns fitDataFill
      resizableRows: true,
      resizableColumns: true,
      placeholder: "Sin datos disponibles", //display message to user on empty table
      clipboard: "copy",
      footerElement: CustomButtons,
      locale: "es-ar",
      pagination: "local",
      paginationSize: 50,
      paginationSizeSelector: [5, 10, 25, 50, 100],
      langs: tabulatorLang,
      // movableColumns:true,
      dataTree: true,
      dataTreeStartExpanded: false,
      columns: [
        // {title:"Ranking", field:"id",align:"center",  width:100}, //
        {
          title: "Nombre",
          field: "nombre",
          width: 150,
          hozAlign: "left",
          bottomCalc: totalCalc,
        },

        {
          title: "Preventivo",
          field: "pre",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        {
          title: "Comp.Reserv.",
          field: "com",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        {
          title: "Devengado",
          field: "dev",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        {
          title: "Pagado",
          field: "pag",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        {
          title: "P.Financiero",
          field: "paf",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        {
          title: "Sin Prev.",
          field: "sin",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        {
          title: "Vigente",
          field: "vig",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        {
          title: "Disponible",
          field: "dis",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        {
          title: "Deuga Exig.",
          field: "deu",
          width: 120,
          hozAlign: "right",
          bottomCalc: "sum",
          bottomCalcFormatter: "money",
          bottomCalcFormatterParams: wrFormatNumber,

          formatter: "money",
          formatterParams: wrFormatNumber,
          sorter: "number",
          accessorParams: {},
          accessor: caMoneda,
        },

        // {title:"Curva", field:"curva", width:75,
        //   formatter:lineFormatter, headerSort:false , download:false},
        // {title:"%/Total", field:"ratio", width:100 ,align:"center" ,
        // accessorParams:{}, accessor:caPorcentaje,
        // formatter:function(cell, formatterParams, onRendered){
        //     return numeral(cell.getValue()).format('0.0%');
        // },
        // sorter:"number"},
        // {title:"Progress", field:"progress", formatter:"progress", sorter:"number"},
        // {title:"Gender", field:"gender"},
        // {title:"Rating", field:"rating", formatter:"star", align:"center", width:100},
        // {title:"Favourite Color", field:"col"},
        // {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
        // {title:"Driver", field:"car", align:"center", formatter:"tickCross"},
      ],
      // initialSort:[
      //     {column:"id", dir:"asc"}, //sort by this first
      // ],
    });
  } else {
    // table1.redraw(true);
    table1.replaceData(dataJson.data);
    ShowNotyPopUp(
      "Se han actualizado los datos de la tabla",
      "ok_fast",
      "center"
    );
  }
}

async function doTable2(action = "update") {
  let rv;

  tableExportTitle = "Movimientos ESIDIF";

  procesando("show");

  try {
    const postParam = {
      action: "table2",
      concepto: $("#t4Concepto").val(),
      plan: $("#t4Plan").val(),
      ee: $("#t2EE").val(),
      tc: $("#t2TC").val(),
      faut: $("#t2FAUT").val(),
    };

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postParam),
      cache: "no-cache",
    };
    const dataResponse = await fetch("/ajax/A05.php", options);
    const dataJson = await dataResponse.json();

    if (dataJson.status != "ok") {
      dataJson.data = [];
      throw dataJson.msg;
    }

    if (action == "create") {
      CustomButtons =
        '<button type="button"  ' +
        '  class="btn btn-info btn-sm tabulator-footer bToExcel" ' +
        '  onClick="exportExcel();"  ' +
        '  title="Exportar a Excel"> ' +
        '  <i class="fas fa-file-excel"></i> Exportar a Excel' +
        "</button>";
      CustomButtons += "&nbsp&nbsp&nbsp";
      CustomButtons +=
        '<button type="button"  ' +
        ' class="btn tabulator-footer  btn-info btn-sm bToPdf" ' +
        ' onClick="exportPdf();"  ' +
        ' title="Exportar a PDF">' +
        '  <i class="fas fa-file-pdf"></i> Exportar a PDF' +
        "</button>&nbsp&nbsp&nbsp";

      let tableH = window.innerHeight - 100 + "px";

      // agregado el 2022-02-11
      // cambio formato de numeros
      const wrFormatNumberNew = {
        decimal: ".",
        thousand: ",",
        symbol: "",
        symbolAfter: false,
        precision: 2,
      };

      table2 = new Tabulator("#Tabulator2", {
        // height:"400px",
        height: "tableH",
        data: dataJson.data,
        layout: "fitDataFill", // fitData  fitColumns fitDataFill
        resizableRows: true,
        resizableColumns: true,
        placeholder: "Sin datos disponibles", //display message to user on empty table
        clipboard: "copy",
        footerElement: CustomButtons,
        locale: "es-ar",
        pagination: "local",
        paginationSize: 15,
        paginationSizeSelector: [5, 10, 25, 50, 100],
        langs: tabulatorLang,
        movableColumns: true,
        // dataTree:true,
        // dataTreeStartExpanded:false,
        columns: [
          {
            title: "Concepto",
            field: "concepto",
            width: 50,
            hozAlign: "center",
            bottomCalc: totalCalc,
            headerSort: true,
            formatter: "lookup",
            formatterParams: tabulatorSelectors.concepto,
            frozen: true,
            accessorDownload: adConcepto,
            accessorDownloadParams: {},
          },
          {
            title: "Plan",
            field: "plan",
            width: 75,
            hozAlign: "center",
            headerSort: true,
            formatter: "lookup",
            formatterParams: tabulatorSelectors.plan,
            frozen: true,
            accessorDownload: adPlan,
            accessorDownloadParams: {},
          },
          {
            title: "Expediente",
            field: "expediente",
            width: 150,
            hozAlign: "left",
            headerSort: true,
            frozen: true,
            headerFilter: "input",
          },
          {
            title: "TC",
            field: "cpt_tipo",
            width: 50,
            hozAlign: "center",
            headerSort: true,
            frozen: true,
            headerFilter: "input",
          },
          {
            title: "F.Autoriz.",
            field: "faut",
            width: 120,
            hozAlign: "center",
            frozen: true,
            headerSort: true,
            sorter: "date",
            sorterParams: {
              format: "YYYY/MM/DD",
            },
            headerFilter: "input",
          },
          {
            title: "Preventivo",
            field: "preventivo",
            width: 100,
            hozAlign: "right",
            headerSort: true,
            bottomCalc: "sum",
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams: wrFormatNumber2,
            formatter: "money",
            formatterParams: wrFormatNumber2,
            sorter: "number",
            accessorDownload: ad2,
            accessorDownloadParams: {},
          },
          {
            title: "Comp.Reserv.",
            field: "compromiso",
            width: 100,
            hozAlign: "right",
            headerSort: true,
            bottomCalc: "sum",
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams: wrFormatNumber2,
            formatter: "money",
            formatterParams: wrFormatNumber2,
            sorter: "number",
            accessorDownload: ad2,
            accessorDownloadParams: {},
          },
          {
            title: "Devengado",
            field: "devengado",
            width: 100,
            hozAlign: "right",
            headerSort: true,
            bottomCalc: "sum",
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams: wrFormatNumber2,
            formatter: "money",
            formatterParams: wrFormatNumber2,
            sorter: "number",
            accessorDownload: ad2,
            accessorDownloadParams: {},
          },
          {
            title: "Pagado",
            field: "pagado",
            width: 100,
            hozAlign: "right",
            headerSort: true,
            bottomCalc: "sum",
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams: wrFormatNumber2,
            formatter: "money",
            formatterParams: wrFormatNumber2,
            sorter: "number",
            accessorDownload: ad2,
            accessorDownloadParams: {},
          },

          {
            title: "P.Financiero",
            field: "pagadofin",
            width: 100,
            hozAlign: "right",
            headerSort: true,
            bottomCalc: "sum",
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams: wrFormatNumber2,
            formatter: "money",
            formatterParams: wrFormatNumber2,
            sorter: "number",
            accessorDownload: ad2,
            accessorDownloadParams: {},
          },
          {
            title: "Numero",
            field: "cpt_num",
            width: 75,
            hozAlign: "center",
            headerSort: true,
            headerFilter: "input",
          },
          {
            title: "Estado",
            field: "cpt_estado",
            width: 100,
            hozAlign: "left",
            headerSort: true,
            headerFilter: "input",
          },
          {
            title: "FF",
            field: "fue",
            width: 75,
            hozAlign: "center",
            headerSort: true,
            headerFilter: "input",
          },
          {
            title: "UG",
            field: "ubi",
            width: 75,
            hozAlign: "center",
            headerSort: true,
            headerFilter: "input",
          },
          {
            title: "Beneficiario",
            field: "ben_nombre",
            width: 100,
            hozAlign: "left",
            headerSort: true,
            headerFilter: "input",
          },
          {
            title: "AP",
            field: "ape",
            width: 75,
            hozAlign: "center",
            headerSort: true,
            headerFilter: "input",
          },
          {
            title: "OG",
            field: "oga",
            width: 75,
            hozAlign: "center",
            headerSort: true,
            headerFilter: "input",
          },
          {
            title: "F.Registro.",
            field: "freg",
            width: 120,
            headerSort: true,
            hozAlign: "center",
          },
          {
            title: "SAF",
            field: "saf",
            width: 75,
            hozAlign: "center",
            sorter: "number",
            headerSort: true,
          },
          {
            title: "EE Num",
            field: "ee_num",
            width: 120,
            headerSort: true,
            hozAlign: "center",
          },
          {
            title: "Absoluto",
            field: "absoluto",
            width: 100,
            hozAlign: "right",
            headerSort: true,
            bottomCalc: "sum",
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams: wrFormatNumber2,
            formatter: "money",
            formatterParams: wrFormatNumber2,
            sorter: "number",
            accessorDownload: ad2,
            accessorDownloadParams: {},
          },
          {
            title: "id",
            field: "id",
            width: 50,
            hozAlign: "center",
            headerSort: true,
            headerFilter: "input",
          },

          // {title:"Curva", field:"curva", width:75,
          //   formatter:lineFormatter, headerSort:false , download:false},
          // {title:"%/Total", field:"ratio", width:100 ,align:"center" ,
          // accessorParams:{}, accessor:caPorcentaje,
          // formatter:function(cell, formatterParams, onRendered){
          //     return numeral(cell.getValue()).format('0.0%');
          // },
          // sorter:"number"},
          // {title:"Progress", field:"progress", formatter:"progress", sorter:"number"},
          // {title:"Gender", field:"gender"},
          // {title:"Rating", field:"rating", formatter:"star", align:"center", width:100},
          // {title:"Favourite Color", field:"col"},
          // {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
          // {title:"Driver", field:"car", align:"center", formatter:"tickCross"},
        ],
        // initialSort:[
        //     {column:"faut", dir:"desc"}, //sort by this first
        // ],
      });
    } else {
      // table2.redraw(true);
      table2.replaceData(dataJson.data);
      ShowNotyPopUp(
        "Se han actualizado los datos de la tabla",
        "ok_fast",
        "center"
      );
    }
    rv = true;
    tableObject = table2;
  } catch (catchMsg) {
    rv = false;
    showNotyPopup(catchMsg.toString(), "errorModal");
  } finally {
    procesando("hide");
    return rv;
  }
}

async function doProcess3($action = "update", $id = false) {
  let rv = true;
  let postParam,
    options,
    dataResponse,
    dataJson,
    ee,
    checked,
    fecha,
    buttonId,
    ahora;
  procesando("show");
  try {
    //throw "myException"; // genera una excepción
    switch ($action) {
      case "modalSave":
        buttonId = parseInt($("#m3Title").attr("value"));
        ee = matrix.resumen[counterEE].expediente;
        // saveData = { ee : {} };    // NO
        saveData = {};
        saveData[ee] = {};
        // modificado el 2022-04-25
        // se agrupan expedientes por tipo de liquidacion en vez de por dependencia
        // saveData[ee].filter = matrix.resumen[counterEE].dependencia;
        saveData[ee].filter = matrix.resumen[counterEE].liquidacion;

        // valida
        if (false === $(".m3Dependencia").hasClass("d-none")) {
          saveData[ee].dependencia = $("#m3Dependencia").val();
        }
        if (false === $(".m3Observaciones").hasClass("d-none")) {
          saveData[ee].obs = $("#m3Observaciones").val();
        }
        //agregado el 2021-01-14
        if (false === $(".m3Eje").hasClass("d-none")) {
          saveData[ee].eje = $("#m3Eje").val();
        }

        saveData[ee].fum = $("#m3Fecha").val();

        if (2 != buttonId) {
          saveData[ee].fing = $("#m3Fecha").val();
        }
        // compromiso reservado
        if (3 == buttonId) {
          //modificado el 2022-04-25 ya no se actualiza la dependencia
          //saveData[ee].dependencia = 223;
          saveData[ee].estado = 190;
          // modificado el 2021-07-16
          // saveData[ee].useg = 8000;
        }
        // devengado
        if (4 == buttonId) {
          saveData[ee].fdev = $("#m3Fecha").val();
          //modificado el 2022-04-25 ya no se actualiza la dependencia
          //saveData[ee].dependencia = 223;
          saveData[ee].estado = 191;
          // modificado el 2021-07-16
          // saveData[ee].useg = 8000;
        }
        // pagado
        if (5 == buttonId) {
          saveData[ee].fpag = $("#m3Fecha").val();
          //modificado el 2022-04-25 ya no se actualiza la dependencia
          // saveData[ee].dependencia = 184;
          saveData[ee].estado = 195;
          saveData[ee].obs = moment().format("YYYY");
          // agregado el 2021-01-28
          saveData[ee].useg = 8005;
        }
        // preventivo
        if (6 == buttonId) {
          saveData[ee].fprev = $("#m3Fecha").val();
          saveData[ee].estado = 198;

          //agregado el 2021-01-22
          saveData[ee].comprobante = $("#m3SG").val();
        }

        // se modifica el 2022-04-25
        // compromiso reservado NO modifica si tiene acto y dictamen
        // if (buttonId > 2 && buttonId < 6) {
        if (buttonId > 3 && buttonId < 6) {
          saveData[ee].acto = true;
          saveData[ee].dictamen = true;
          matrix.resumen[counterEE].acto = saveData[ee].acto;
          matrix.resumen[counterEE].dictamen = saveData[ee].dictamen;
        }

        if (buttonId < 3) {
          checked = matrix.resumen[counterEE].dictamen == "1" ? true : false;
          if ($("#m3Dictamen").prop("checked") !== checked) {
            saveData[ee].dictamen = $("#m3Dictamen").prop("checked");
            matrix.resumen[counterEE].dictamen = saveData[ee].dictamen;
          }
          checked = matrix.resumen[counterEE].acto == "1" ? true : false;
          if ($("#m3Acto").prop("checked") !== checked) {
            saveData[ee].acto = $("#m3Acto").prop("checked");
            matrix.resumen[counterEE].acto = saveData[ee].acto;
          }
        }
        rv = await saveEE(saveData, ee);
        // return saveEE(saveData , ee);
        break;

      case "modal":
        buttonId = parseInt(_right($id, 1));
        // cambio el titulo del modal y le asigna como valor el tipo de accion
        $("#m3Title").text($("#" + $id).text());
        $("#m3Title").attr("value", buttonId);

        // fecha por default = hoy
        //$('#m3Fecha').val( moment().format('YYYY-MM-DD')  );
        let weekDay = moment().day();
        let corrimiento;
        if (0 == weekDay) {
          corrimiento = 2;
        } else if (1 == weekDay) {
          corrimiento = 3;
        } else {
          corrimiento = 1;
        }
        $("#m3Fecha").val(
          moment().subtract(corrimiento, "days").format("YYYY-MM-DD")
        );

        // muestra o esconde campos según el tipo de accion
        if (buttonId == 1) {
          $(".m3Dependencia").removeClass("d-none");
        } else {
          $(".m3Dependencia").addClass("d-none");
        }
        // agregado el 2021-01-22
        if (buttonId == 6) {
          $(".m3SG").removeClass("d-none");
          $("#m3SG").val("");
        } else {
          $(".m3SG").addClass("d-none");
        }

        if (buttonId < 3) {
          $(".m3Observaciones").removeClass("d-none");
          $("#m3Observaciones").val("en proceso");
          // agregado el 2020-16-12
          $(".m3Logicos").removeClass("d-none");
          checked = matrix.resumen[counterEE].dictamen == "1" ? true : false;
          $("#m3Dictamen").prop("checked", checked);
          checked = matrix.resumen[counterEE].acto == "1" ? true : false;
          $("#m3Acto").prop("checked", checked);
          // agregado el 2021-01-14
          $(".m3Eje").removeClass("d-none");
          $("#m3Eje").val(matrix.resumen[counterEE].eje);
        } else {
          $(".m3Observaciones").addClass("d-none");
          // agregado el 2020-16-12
          $(".m3Logicos").addClass("d-none");
          // agregado el 2021-01-14
          $(".m3Eje").addClass("d-none");
        }

        // agregado el 2021-01-22
        if (buttonId == 6) {
          $(".m3SG").removeClass("d-none");
          $(".m3Eje").removeClass("d-none");
          $("#m3Eje").val(matrix.resumen[counterEE].eje);
          $(".m3Observaciones").removeClass("d-none");
          $("#m3Observaciones").val("IF a la firma OK");
        } else {
          $(".m3SG").addClass("d-none");
          $(".m3Eje").addClass("d-none");
        }

        // muestra dialogo modal
        $.blockUI({
          message: $("#modificarEE"),
          centerY: false,
          centerX: true,
          css: {
            width: "60vw",
            left: "20vw",
            height: "60vh",
            top: "60px",
          },
        });
        break;

      case "save":
        ee = matrix.resumen[counterEE].expediente;
        // saveData = { ee : {} };    // NO
        saveData = {};
        saveData[ee] = {};

        //verifica que campos cambiaron
        const changes = await checkChanges(false);
        if (false === changes.status) {
          procesando("hide");
          showNotyPopup("No hay nada para grabar", "warning", "center");
          return true;
        }
        saveData[ee] = changes.data;

        // modificado el 2022-04-25
        // envia como filtro el tipo de liquidacion en vez de la dependencia
        // saveData[ee].filter = matrix.resumen[counterEE].dependencia;
        saveData[ee].filter = matrix.resumen[counterEE].liquidacion;

        rv = await saveEE(saveData, ee);
        // return saveEE(saveData , ee);
        break;

      case "create":
        clipboardCopied = false; //resetea el indicador si se copio al clipboard

        if (thisPage == "p0511c") {
          postParam = {
            action: "p0511c",
            filter: doFilter(),
          };
        } else {
          postParam = {
            action: "getEE",
            concepto: $("#t3Concepto option:selected").val(),
            dependencia: $("#t3Dependencia").val(),
            ualta: $("#t3Usuario").val(),
          };
          ee = $("#t3EE").val();
          postParam.ee = ee.trim() == "" ? false : ee;
          postParam.faut = $("#t3FAUT").val() || false;
        }

        // ejecuta ajax
        options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(postParam),
          cache: "no-cache",
        };

        dataResponse = await fetch("/ajax/A05.php", options);
        dataJson = await dataResponse.json();

        if (dataJson.status != "ok") {
          throw dataJson.msg;
        }
        if (dataJson.data.length == 0) {
          throw "No se encontraron datos con los filtros seleccionados.";
        }

        matrix = dataJson.data;
        counterEE = 0;

        $(".filtros").hide();
        $(".f3Hide").addClass("f3Show");
        $(".f3Show").removeClass("f3Hide");
        foo = await showEE();
        break;

      case "todo":
        /*
                   if (action == 'create') {

                     let tableH = (window.innerHeight - 100 ) + 'px';

                     table2 = new Tabulator("#Tabulator2", {
                       // height:"400px",
                       height:"tableH",
                       data:dataJson.data,
                       layout:"fitDataFill",    // fitData  fitColumns fitDataFill
                       resizableRows:true,
                       resizableColumns:true,
                       placeholder:"Sin datos disponibles", //display message to user on empty table
                       clipboard:"copy",
                       footerElement: CustomButtons,
                       locale:'es-ar',
                       pagination:"local",
                       paginationSize:50,
                       paginationSizeSelector:[5, 10, 25, 50,100],
                       langs:  tabulatorLang    , 
                       // movableColumns:true,
                       // dataTree:true,
                       // dataTreeStartExpanded:false,
                       columns:[
                           // {title:"Ranking", field:"id",align:"center",  width:100}, //
                           {title:"Concepto", field:"concepto", width:50,hozAlign:"center"
                             , bottomCalc :totalCalc, headerSort:false, frozen:true},
                           {title:"Plan", field:"plan", width:75 , hozAlign:"center", headerSort:false, frozen:true},
                           {title:"Expediente", field:"expediente", width:150 , hozAlign:"left", headerSort:false, frozen:true},
                           {title:"TC", field:"cpt_tipo", width:50 , hozAlign:"center", headerSort:false, frozen:true
                             , headerFilter:"input"},
                           {title:"F.Autoriz.", field:"faut", width:120 , hozAlign:"center" , frozen:true
                            , sorter:"date", sorterParams:{format:"YYYY/MM/DD"}},

                           {title:"Preventivo", field:"preventivo", width:100 , hozAlign:"right"  ,
                             bottomCalc :"sum",bottomCalcFormatter:"money" , 
                              bottomCalcFormatterParams:wrFormatNumber,

                             formatter:"money", formatterParams:wrFormatNumber,
                             sorter:"number",
                             accessorParams:{}, accessor:caMoneda,
                           },
                           {title:"Comp.Reserv.", field:"compromiso", width:100 , hozAlign:"right"  ,
                             bottomCalc :"sum",bottomCalcFormatter:"money" , 
                              bottomCalcFormatterParams:wrFormatNumber,

                             formatter:"money", formatterParams:wrFormatNumber,
                             sorter:"number",
                             accessorParams:{}, accessor:caMoneda,
                           },
                           {title:"Devengado", field:"devengado", width:100 , hozAlign:"right"  ,
                             bottomCalc :"sum",bottomCalcFormatter:"money" , 
                              bottomCalcFormatterParams:wrFormatNumber,

                             formatter:"money", formatterParams:wrFormatNumber,
                             sorter:"number",
                             accessorParams:{}, accessor:caMoneda,
                           },
                           {title:"Pagado", field:"pagado", width:100 , hozAlign:"right"  ,
                             bottomCalc :"sum",bottomCalcFormatter:"money" , 
                              bottomCalcFormatterParams:wrFormatNumber,

                             formatter:"money", formatterParams:wrFormatNumber,
                             sorter:"number",
                             accessorParams:{}, accessor:caMoneda,
                           },
                           {title:"P.Financiero", field:"pagadofin", width:100 , hozAlign:"right"  ,
                             bottomCalc :"sum",bottomCalcFormatter:"money" , 
                              bottomCalcFormatterParams:wrFormatNumber,

                             formatter:"money", formatterParams:wrFormatNumber,
                             sorter:"number",
                             accessorParams:{}, accessor:caMoneda,
                           },

                           {title:"Numero", field:"cpt_num", width:75 , hozAlign:"center", headerSort:false},
                           {title:"Estado", field:"cpt_estado", width:100 , hozAlign:"left", headerSort:false},
                           {title:"UG", field:"ubi", width:75 , hozAlign:"center", headerSort:false},
                           {title:"Beneficiario", field:"ben_nombre", width:100 , hozAlign:"center", headerSort:false},
                           {title:"AP", field:"ape", width:75 , hozAlign:"center", headerSort:false},
                           {title:"OG", field:"oga", width:75 , hozAlign:"center", headerSort:false},
                           {title:"FF", field:"fue", width:75 , hozAlign:"center", headerSort:false},
                           {title:"F.Registro.", field:"freg", width:120 , hozAlign:"center" },


                           // {title:"Curva", field:"curva", width:75, 
                           //   formatter:lineFormatter, headerSort:false , download:false},
                           // {title:"%/Total", field:"ratio", width:100 ,align:"center" ,
                           // accessorParams:{}, accessor:caPorcentaje,
                           // formatter:function(cell, formatterParams, onRendered){
                           //     return numeral(cell.getValue()).format('0.0%');  
                           // }, 
                           // sorter:"number"},
                           // {title:"Progress", field:"progress", formatter:"progress", sorter:"number"},
                           // {title:"Gender", field:"gender"},
                           // {title:"Rating", field:"rating", formatter:"star", align:"center", width:100},
                           // {title:"Favourite Color", field:"col"},
                           // {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
                           // {title:"Driver", field:"car", align:"center", formatter:"tickCross"},
                       ],
                       initialSort:[
                           {column:"faut", dir:"asc"}, //sort by this first
                       ],
                     });

                   } else {
                     table2.redraw(true);
                   }
                */
        break;
    }
  } catch (catchMsg) {
    rv = false;
    // console.error( catchMsg.toString() );
    showNotyPopup(catchMsg.toString(), "errorModal");
  } finally {
    procesando("hide");
    return rv;
  }
}

async function showEE(direction = false) {
  let rv = true;
  let markEE = false;

  // primero chequea si hay registros para guardar

  // modificado el 2020-12-13: solo chequea si esta habilitado el boton GRABAR
  // agregado el 2020-12-14 NO chequea si es p0511c
  if (
    direction != false &&
    false === $("#b03b").hasClass("d-none") &&
    thisPage != "p0511c"
  ) {
    const editedCells = table3.getEditedCells();
    if (editedCells.length > 0) {
      showNotyPopup(
        "Hay datos de la grilla sin guardar. Verificalo antes de cambiar de expediente",
        "warning",
        "center"
      );
      return false;
    }
    const changes = await checkChanges(true);
    if (false === changes.status) {
      showNotyPopup(
        "Hay datos del formulario sin guardar. Verificalo antes de cambiar de expediente",
        "warning",
        "center"
      );
      return false;
    }
  }

  const totalEE = matrix.resumen.length - 1;
  tableObject = table3;
  tableExportTitle = "Modificación EE";
  let eeSig, eeAnt;

  try {
    //  modifica el puntero
    if (direction === false) {
      // inicializa el puntero si recien inicia el ciclo
      counterEE = 0;
    }

    if (direction == "prev") {
      if (counterEE == 0) {
        throw "Este es el primer registro";
      } else {
        counterEE--;
      }
    } else if (direction == "next") {
      if (counterEE == totalEE) {
        throw "Este es el último registro";
      } else {
        counterEE++;
      }
    } else if (direction == "nextAndMark") {
      // modificado el 2021-10-24
      // marca para procesar el registro aunque sea el ultimo
      /*
            // codigo original
            if (counterEE == totalEE) {
                throw "Este es el último registro";
            } else {
                // marca el registro como procesado
                postParam = {
                    action: 'markEE',
                    saveData: {
                        ee: $('#f3EE').val(),
                        dependencia: matrix.resumen[counterEE].dependencia,
                    }
                };
                options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(postParam),
                    cache: 'no-cache'
                };
                // modificado el 2020-12-19: se mueve la actualizacion al final de la funcion
                markEE = true;
                // dataResponse = await fetch('/ajax/A05.php' , options) ;
                // dataJson     = await dataResponse.json() ;
                // if ( dataJson.status != 'ok' ) {
                //   throw dataJson.msg;
                // }

                // actualizacion ok, actualiza internamente  la fecha de seguimiento
                // 
                const ahora = moment().format('YYYY-MM-DD HH:mm:ss');
                matrix.resumen[counterEE].fmodi = ahora;
                $('#f3FSEG').val(ahora);
                $('#f3FSEG').addClass('bg-success');
                ShowNotyPopUp('Expediente marcado como procesado', 'ok_fast', 'topRight');
                // pasa al siguiente registro
                counterEE++;
            }
            */

      // nuevo codigo 2021-10-24
      // marca el registro como procesado
      postParam = {
        action: "markEE",
        saveData: {
          ee: $("#f3EE").val(),
          // modificado el 2022-04-25
          // agrupo exp por tipo de liquidacion
          // dependencia: matrix.resumen[counterEE].dependencia,
          liquidacion: matrix.resumen[counterEE].liquidacion,
        },
      };
      options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(postParam),
        cache: "no-cache",
      };
      // la actualizacion se hace al final de la funcion
      markEE = true;

      // OJO revisar si esto esta bien????????????????????
      const ahora = moment().format("YYYY-MM-DD HH:mm:ss");
      matrix.resumen[counterEE].fmodi = ahora;
      $("#f3FSEG").val(ahora);
      $("#f3FSEG").addClass("bg-success");
      ShowNotyPopUp("Expediente marcado como procesado", "ok_fast", "topRight");

      if (counterEE == totalEE) {
        // si es el ultimo registro, hace la actualizacion y luego avisa
        dataResponse = await fetch("/ajax/A05.php", options);
        dataJson = await dataResponse.json();
        if (dataJson.status != "ok") {
          throw dataJson.msg;
        } else {
          throw "Este es el último registro";
        }
      } else {
        counterEE++;
      }
    }

    // prueba de mover aca el manejo de clipboard

    // verifica si hay siguiente y anterior antes  de modificar el puntero
    //
    if (totalEE == 0) {
      // 1 unico registro
      eeAnt = 0;
      eeSig = 0;
    } else if (counterEE == 0) {
      // primer registro
      eeAnt = 0;
      eeSig = counterEE + 1;
      $("#b03c").attr("data-clipboard-text", matrix.resumen[eeAnt].expediente);
      $("#b03d").attr("data-clipboard-text", matrix.resumen[eeSig].expediente);
      $("#b03e").attr("data-clipboard-text", matrix.resumen[eeSig].expediente);
    } else if (counterEE == totalEE) {
      // ultimo registro
      eeAnt = counterEE - 1;
      eeSig = counterEE;
    } else {
      eeAnt = counterEE - 1;
      eeSig = counterEE + 1;
    }
    // determina el texto del clipboard de boton SIG y ANT

    if (counterEE == 1 && clipboardCopied === true) {
      clipboardOld = true;
    }

    if (clipboardOld === true) {
      $("#b03d").attr("data-clipboard-text", matrix.resumen[eeSig].expediente);
      $("#b03e").attr("data-clipboard-text", matrix.resumen[eeSig].expediente);
      $("#b03c").attr("data-clipboard-text", matrix.resumen[eeAnt].expediente);
    }
    clipboardCopied = false;

    expedienteAnterior = matrix.resumen[eeAnt].expediente;
    expedienteSiguiente = matrix.resumen[eeSig].expediente;

    $("#f3Cantidad").val(counterEE + 1 + " / " + (totalEE + 1));

    // continua con el siguiente registro
    //
    $("#f3EE").val(matrix.resumen[counterEE].expediente);
    $("#f3FSEG").val(matrix.resumen[counterEE].fmodi);

    if (moment(matrix.resumen[counterEE].fmodi).format("YYYY-MM-DD") == hoy) {
      $("#f3FSEG").addClass("bg-success");
    } else {
      $("#f3FSEG").removeClass("bg-success");
    }

    // $('#f3Dependencia').val(matrix.resumen[counterEE].dependencia);
    // modificado el 2020-12-13 por multislect
    $("#f3Dependencia").multiselect("deselectAll", false);
    $("#f3Dependencia").multiselect(
      "select",
      matrix.resumen[counterEE].dependencia
    );
    $("#f3Dependencia").multiselect("refresh");

    $("#f3Estado").val(matrix.resumen[counterEE].estado);

    $("#f3SG").val(matrix.resumen[counterEE].comprobante);
    $("#f3Observaciones").val(matrix.resumen[counterEE].obs);
    $("#f3FUM").val(matrix.resumen[counterEE].fum);
    $("#f3FING").val(matrix.resumen[counterEE].fing);
    $("#f3FPRE").val(matrix.resumen[counterEE].fpre);
    $("#f3FDEV").val(matrix.resumen[counterEE].fdev);
    $("#f3FPAG").val(matrix.resumen[counterEE].fpag);

    let checked = matrix.resumen[counterEE].dictamen == "1" ? true : false;
    $("#f3Dictamen").prop("checked", checked);
    checked = matrix.resumen[counterEE].acto == "1" ? true : false;
    $("#f3Acto").prop("checked", checked);

    $("#f3Importe").val(
      numeral(matrix.resumen[counterEE].monto).format("$ 0,0.00")
    );

    $("#f3Liquidacion").val(matrix.resumen[counterEE].liquidacion);
    $("#f3PeriodoIni").val(matrix.resumen[counterEE].periodo);
    $("#f3PeriodoFin").val(matrix.resumen[counterEE].periodo_fin);
    $("#f3Usuario").val(matrix.resumen[counterEE].ualta);

    // agregado el 2021-05-01
    $("#f3Useg").val(matrix.resumen[counterEE].useg);

    // agregado el 2021-01-14
    $("#f3Eje").val(matrix.resumen[counterEE].eje);

    // actualiza tabulator
    if (false == table3) {
      // crea el tabulator
      //
      let tableH = window.innerHeight - 200 + "px";
      if (wr.rol < 7 || thisPage == "p0511c") {
        saveButton = "";
      }

      let allowEdit = thisPage == "p0511m" ? true : false;

      // agregado el 2022-04-25 - clonar filas
      rowMenu = [
        {
          label: "Clonar la fila",
          action: function (e, row) {
            p0511mClonarFila(row._row.data.id);
          },
        },
      ];

      // agregado el 2022-04-26
      let claveDetalle =
        matrix.resumen[counterEE].expediente +
        "_" +
        matrix.resumen[counterEE].liquidacion;

      table3 = new Tabulator("#Tabulator3", {
        height: "tableH",
        // modificado el 2022-04-26
        // data: matrix.detalle[matrix.resumen[counterEE].expediente],
        data: matrix.detalle[claveDetalle],
        layout: "fitColumns", // fitData  fitColumns fitDataFill
        resizableRows: true,
        resizableColumns: true,
        placeholder: "Sin datos disponibles", //display message to user on empty table
        clipboard: "copy",
        footerElement: saveButton + CustomButtons,
        locale: "es-ar",
        pagination: "local",
        paginationSize: 10,
        paginationSizeSelector: [5, 10, 25, 50, 100],
        langs: tabulatorLang,
        selectable: 1,

        // agregado el 2022-04-25
        // duplicar filas
        rowContextMenu: rowMenu, //add context menu to row

        columns: [
          {
            title: "id",
            field: "id",
            hozAlign: "center",
            width: 30,
            headerSort: false,
            frozen: true,
          },

          {
            title: "Concepto",
            field: "concepto",
            width: 75,
            hozAlign: "center",
            headerSort: true,
            editor: thisPage == "p0511m" ? "select" : false,
            editorParams: {
              values: tabConcepto,
            },
            formatter: "lookup",
            formatterParams: tabConcepto,
            frozen: true,
          },

          {
            title: "Plan",
            field: "plan",
            width: 75,
            hozAlign: "center",
            headerSort: true,
            editor: thisPage == "p0511m" ? "select" : false,
            editorParams: {
              values: tabPlan,
            },
            formatter: "lookup",
            formatterParams: tabPlan,
            frozen: true,
          },

          {
            title: "detalle",
            field: "detalle",
            width: 150,
            hozAlign: "left",
            editor: allowEdit,
            bottomCalc: totalCalc,
            headerSort: true,
            frozen: false,
          },

          {
            title: "beneficiario",
            field: "beneficiario",
            width: 100,
            hozAlign: "center",
            headerSort: true,
            editor: thisPage == "p0511m" ? "select" : false,
            editorParams: {
              values: tabulatorSelectors.beneficiario,
            },
            formatter: "lookup",
            formatterParams: tabulatorSelectors.beneficiario,
            frozen: false,
          },

          {
            title: "Monto",
            field: "monto",
            width: 100,
            hozAlign: "right",
            bottomCalc: "sum",
            bottomCalcFormatter: "money",
            bottomCalcFormatterParams: wrFormatNumber,
            formatter: "money",
            formatterParams: wrFormatNumber,
            headerSort: true,
            sorter: "number",
            editor: allowEdit,
            // editor: (thisPage == 'p0511m') ? 'input' : false,
            // editorParams: {
            //     mask: "9999-99-99",
            //     maskAutoFill: true,
            // },
            accessorParams: {},
            accessor: caMoneda,
          },

          {
            title: "estado",
            field: "estado",
            width: 75,
            hozAlign: "left",
            editor: thisPage == "p0511m" ? "select" : false,
            editorParams: {
              values: tabulatorSelectors.estado,
            },
            formatter: "lookup",
            formatterParams: tabulatorSelectors.estado,
            headerSort: true,
          },

          {
            title: "Obs.",
            field: "obs",
            width: 150,
            hozAlign: "left",
            editor: allowEdit,
            headerSort: true,
            frozen: false,
          },

          {
            title: "SG",
            field: "comprobante",
            width: 50,
            editor: allowEdit,
            hozAlign: "left",
            headerSort: true,
          },

          {
            title: "F.Prev.",
            field: "fprev",
            width: 80,
            hozAlign: "center",
            editor: allowEdit,
            headerSort: true,
            // sorter                 : "date",
            // sorterParams           : {format:"YYYY/MM/DD"}
          },

          {
            title: "F.Devengado.",
            field: "fdev",
            width: 80,
            hozAlign: "center",
            headerSort: true,
            editor: allowEdit,
            sorter: "date",
            sorterParams: { format: "YYYY/MM/DD" },
          },

          {
            title: "F.Pagado",
            field: "fpag",
            width: 80,
            hozAlign: "center",
            headerSort: true,
            editor: allowEdit,
            sorter: "date",
            sorterParams: { format: "YYYY/MM/DD" },
          },

          {
            title: "fuente",
            field: "fuente",
            width: 75,
            hozAlign: "left",
            editor: thisPage == "p0511m" ? "select" : false,
            editorParams: {
              values: tabulatorSelectors.fuente,
            },
            formatter: "lookup",
            formatterParams: tabulatorSelectors.fuente,
            headerSort: true,
          },

          {
            title: "liquidacion",
            field: "liquidacion",
            width: 75,
            hozAlign: "left",
            editor: thisPage == "p0511m" ? "select" : false,
            editorParams: {
              values: tabulatorSelectors.liquidacion,
            },
            formatter: "lookup",
            formatterParams: tabulatorSelectors.liquidacion,
            headerSort: true,
          },

          {
            title: "ap",
            field: "ap",
            width: 75,
            hozAlign: "left",
            editor: allowEdit,
            headerSort: true,
          },
          {
            title: "og",
            field: "og",
            width: 75,
            hozAlign: "left",
            editor: allowEdit,
            headerSort: true,
          },

          {
            title: "proyecto",
            field: "proyecto",
            width: 75,
            hozAlign: "left",
            editor: thisPage == "p0511m" ? "select" : false,
            editorParams: {
              values: tabulatorSelectors.proyecto,
            },
            formatter: "lookup",
            formatterParams: tabulatorSelectors.proyecto,
            headerSort: true,
          },

          {
            title: "periodo",
            field: "periodo",
            width: 80,
            hozAlign: "center",
            headerSort: true,
            editor: thisPage == "p0511m" ? "input" : false,
            editorParams: {
              mask: "9999-99-99",
              maskAutoFill: true,
            },
          },

          // {title:"Numero", field:"cpt_num", width:75 , hozAlign:"center", headerSort:false},
          // {title:"Estado", field:"cpt_estado", width:100 , hozAlign:"left", headerSort:false},
          // {title:"UG", field:"ubi", width:75 , hozAlign:"center", headerSort:false},
          // {title:"Beneficiario", field:"ben_nombre", width:100 , hozAlign:"center", headerSort:false},
          // {title:"AP", field:"ape", width:75 , hozAlign:"center", headerSort:false},
          // {title:"OG", field:"oga", width:75 , hozAlign:"center", headerSort:false},
          // {title:"FF", field:"fue", width:75 , hozAlign:"center", headerSort:false},
          // {title:"F.Registro.", field:"freg", width:120 , hozAlign:"center" },
          // {title:"Curva", field:"curva", width:75,
          //   formatter:lineFormatter, headerSort:false , download:false},
          // {title:"%/Total", field:"ratio", width:100 ,align:"center" ,
          // accessorParams:{}, accessor:caPorcentaje,
          // formatter:function(cell, formatterParams, onRendered){
          //     return numeral(cell.getValue()).format('0.0%');
          // },
          // sorter:"number"},
          // {title:"Progress", field:"progress", formatter:"progress", sorter:"number"},
          // {title:"Gender", field:"gender"},
          // {title:"Rating", field:"rating", formatter:"star", align:"center", width:100},
          // {title:"Favourite Color", field:"col"},
          // {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
          // {title:"Driver", field:"car", align:"center", formatter:"tickCross"},
        ],
        initialSort: [
          {
            column: "id",
            dir: "asc",
          }, //sort by this first
        ],
        rowSelected: function (row) {
          //row - row component for the deselected row
          // _debug( row , 'rowSelected');
        },
        rowDeselected: function (row) {
          //row - row component for the deselected row
          // _debug( row , 'rowDeselected row');
          // _debug( this.getEditedCells() , 'rowDeselected getEditedCells');
        },
        rowSelectionChanged: function (data, rows) {
          //rows - array of row components for the selected rows in order of selection
          //data - array of data objects for the selected rows in order of selection
          // _debug( rows , 'rowSelectionChanged');
          // _debug( data , 'rowSelectionChanged');
        },
      });
    } else {
      // actualiza el tabulator
      // agregado el 2022-04-26
      let claveDetalle =
        matrix.resumen[counterEE].expediente +
        "_" +
        matrix.resumen[counterEE].liquidacion;
      data: matrix.detalle[claveDetalle],
        // table3.replaceData(matrix.detalle[matrix.resumen[counterEE].expediente]);
        table3.replaceData(matrix.detalle[claveDetalle]);
    }

    // modificado el 2020-12-19: se mueve aca la actualizacion de marcar como procesado un EE
    if (markEE === true) {
      dataResponse = await fetch("/ajax/A05.php", options);
      dataJson = await dataResponse.json();
      if (dataJson.status != "ok") {
        throw dataJson.msg;
      }
      markEE = false; // por las dudas
    }
  } catch (catchMsg) {
    rv = false;
    showNotyPopup(catchMsg.toString(), "errorModal");
  } finally {
    return rv;
  }
}

async function cancelCells3() {
  table3.clearCellEdited();
  showNotyPopup("Se cancelaron las actualizaciones de este expediente");
  return true;
}

async function p0511mClonarFila(rowID = false) {
  let rw = await __p0511mClonarFila(rowID);
  return rw;
}

async function __p0511mClonarFila($rowID = false) {
  let rv = false;

  try {
    if ($rowID === false) {
      throw "Faltan parámetro en la función p0511mClonarFila()";
    }
    postParam = {
      action: "cloneRow",
      table: "f0511",
      pkValue: $rowID,
    };
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postParam),
      cache: "no-cache",
    };
    dataResponse = await fetch("/ajax/A05.php", options);
    dataJson = await dataResponse.json();
    // cierra modal
    // $.unblockUI();
    // verifica ajax
    if (dataJson.status != "ok") {
      throw dataJson.msg;
    }

    // actualizacion ok,
    ShowNotyPopUp(
      "Se clonó la fila con el número: " + dataJson.id,
      "ok",
      "center"
    );
    // rv = true;
    rv = await doProcess3(($action = "create"));
  } catch (e) {
    showNotyPopup(e.toString(), "errorModal");
  } finally {
    return rv;
  }
}

async function saveCells3() {
  let rv = true;
  procesando("show");
  try {
    const editedCells = table3.getEditedCells();

    if (editedCells.length == 0) {
      procesando("hide");
      showNotyPopup("No hay nada para grabar", "warning", "center");
      return true;
    }

    // OJO falta agregar composicion del campo DETALLE si se modica algunos de los campos que lo componen

    let matrix = {};
    _.each(editedCells, function (cellData, index) {
      const cellField = cellData._cell.column.field;
      const cellNewValue = cellData._cell.value;
      const pk = "pk_" + cellData._cell.row.cells[0].value;

      if (!matrix[pk]) {
        matrix[pk] = {};
      }
      matrix[pk][cellField] = cellNewValue.replace("id~", "");
    });

    table3.clearCellEdited();

    let postParam = {
      action: "saveCells",
      saveData: matrix,
      // agregado el 2021-07-20
      // pasa como parametro el usuario
    };
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postParam),
      cache: "no-cache",
    };
    const dataResponse = await fetch("/ajax/A05.php", options);
    const dataJson = await dataResponse.json();

    if (dataJson.status != "ok") {
      throw dataJson.msg;
    }

    ShowNotyPopUp(
      "Se actualizaron " + _.size(matrix) + " registros",
      "ok",
      "center"
    );
  } catch (catchMsg) {
    rv = false;
    showNotyPopup(catchMsg.toString(), "errorModal");
  } finally {
    procesando("hide");
    return rv;
  }
}

async function doHider($action = true) {
  if ($action) {
    // hide
    $(".f3Show").addClass("f3Hide");
    $(".f3Hide").removeClass("f3Show");
  } else {
    // hide
    $(".f3Hide").addClass("f3Show");
    $(".f3Show").removeClass("f3Hide");
  }
}

async function doP0511($action = false) {
  let rv, n;
  procesando("show");
  try {
    switch ($action) {
      case "save":
        // primero valida campos obligatorios

        let emptyFields = $(
          ".wrShow > div > input , .f3Show > div > input"
        ).filter(function () {
          let isEmpty = 0;
          if (
            ($(this).val() === "" || $(this).val() == "0") &&
            $(this).is("[required]")
          ) {
            $(this).addClass("wrRed");
            isEmpty = 1;
          } else {
            $(this).removeClass("wrRed");
          }
          return isEmpty;
        }).length;

        if (emptyFields > 0) {
          throw "Existen campo obligatorios sin completar";
        }

        // otras validaciones
        if ($("#t4PeriodoIni").val() == $("#t4PeriodoFin").val()) {
          throw "El período de inicio y fin NO pueden ser iguales";
        }

        n = new Noty({
          theme: "metroui",
          layout: "center",
          type: "alert",

          text: "Confirma grabar el registro de Expediente? ",
          buttons: [
            Noty.button("SI", "btn btn-success btn-block px-3", function () {
              n.close();
              saveData = {};
              saveData.concepto = $("#t4Concepto").val();
              saveData.proyecto = $("#t4Proyecto").val();
              saveData.dependencia = 234; //OJO hardcoded
              saveData.estado = $("#t4Estado").val();

              saveData.liquidacion = $("#t4Liquidacion").val();
              saveData.descripcion = $("#t4Descripcion").val();
              saveData.expediente = $("#t4EE").val();
              saveData.obs = $("#t4Obs").val();
              saveData.periodo = $("#t4PeriodoIni").val();
              saveData.periodo_fin = $("#t4PeriodoFin").val();
              saveData.fidp = $("#t4FIDP").val();
              saveData.fum = moment().format("YYYY-MM-DD"); //OJO hardcoded
              saveData.fing = $("#t4FIDP").val();
              // modificado el 2021-01-05
              // saveData.eje             = moment().format('YYYY');
              saveData.eje = _left(saveData.fidp, 4);

              // labels
              saveData.labels = {};
              saveData.labels.proyecto = $(
                "#t4Proyecto option:selected"
              ).text();
              saveData.labels.benef1 = $(
                "#t4Beneficiario1 option:selected"
              ).text();

              // registros especificos
              saveData.r1 = {};
              saveData.r1.beneficiario = $("#t4Beneficiario1").val();
              saveData.r1.comprobante = $("#t4Comprobante1").val();
              saveData.r1.monto = $("#t4Importe1").val();
              saveData.r1.ap = $("#t4APE1").val();
              saveData.r1.og = $("#t4OGA1").val();
              saveData.r1.fprev = $("#t4FPRE1").val();
              saveData.r1.fuente = $("#t4Fuente1").val();
              // agregado el 2020-11-15
              saveData.r1.plan = $("#t4Plan").val();
              // registro 2 - optativo
              //
              // selectedPlan             = $('#t4Plan').val();
              const importe2 = $("#t4Importe2").val();
              if ($("#t4Plan").val() == 20 && importe2 != "0") {
                saveData.r2 = {};
                saveData.r2.beneficiario = $("#t4Beneficiario2").val();
                saveData.r2.comprobante = $("#t4Comprobante2").val();
                saveData.r2.monto = $("#t4Importe2").val();
                saveData.r2.ap = $("#t4APE2").val();
                saveData.r2.og = $("#t4OGA2").val();
                saveData.r2.fprev = $("#t4FPRE2").val();
                saveData.r2.fuente = $("#t4Fuente2").val();
                //
                saveData.labels.benef2 = $(
                  "#t4Beneficiario2 option:selected"
                ).text();
                // agregado el 2020-11-15
                saveData.r2.plan = 21;
              }

              rv = saveF0511(saveData);
            }),

            Noty.button("NO", "btn btn-danger btn-block px-3", function () {
              n.close();
            }),
          ],
        });
        n.show();
        break;

      case "reuse":
        // oculta la segunda linea de detalle
        selectedPlan = $("#t4Plan").val();
        if (selectedPlan == 20) {
          doHider(false);
        } else {
          doHider(true);
        }

        // blanquea todos los campos
        $("#t4EE").val(saveData.expediente);
        $("#t4FIDP").val(saveData.fidp);
        $("#t4PeriodoIni").val(saveData.periodo);
        $("#t4PeriodoFin").val(saveData.periodo_fin);
        $("#t4Obs").val(saveData.obs);
        $("#t4Descripcion").val(saveData.descripcion);
        // $('#t4Detalle').val('');                           // este no se completa
        $("#t4Importe1").val(saveData.r1.monto);
        $("#t4Comprobante1").val(saveData.r1.comprobante);
        $("#t4FPRE1").val(saveData.r1.fprev);
        $("#t4APE1").val(saveData.r1.ap);
        $("#t4OGA1").val(saveData.r1.og);
        if (saveData.r2) {
          $("#t4Importe2").val(saveData.r2.monto);
          $("#t4Comprobante2").val(saveData.r2.comprobante);
          $("#t4FPRE2").val(saveData.r2.fprev);
          $("#t4APE2").val(saveData.r2.ap);
          $("#t4OGA2").val(saveData.r2.og);
        }
        ShowNotyPopUp("datos restaurados", "ok_fast"); //   , 'center'
        break;

      case "cancel":
        n = new Noty({
          theme: "metroui",
          layout: "center",
          type: "alert",

          text: "Confirma cancelar los datos cargados? ",
          buttons: [
            Noty.button("SI", "btn btn-success btn-block px-3", function () {
              console.log("cancelacion aceptada");
              doP0511("blank");
              n.close();
            }),

            Noty.button("NO", "btn btn-danger btn-block px-3", function () {
              console.log("cancelación cancelada");
              n.close();
            }),
          ],
        });
        n.show();
        break;

      case "blank":
        // blanquea todos los campos
        $("#t4EE").val("");
        $("#t4FIDP").val("");
        $("#t4PeriodoIni").val("");
        $("#t4PeriodoFin").val("");
        $("#t4Obs").val("");
        $("#t4Descripcion").val("");
        $("#t4Detalle").val("");
        $("#t4Importe1").val("0");
        $("#t4Importe2").val("0");
        $("#t4Comprobante1").val("");
        $("#t4Comprobante2").val("");
        $("#t4FPRE1").val("");
        $("#t4FPRE2").val("");
        $("#t4APE1").val("");
        $("#t4APE2").val("");
        $("#t4OGA1").val("");
        $("#t4OGA2").val("");

        // oculta la segunda linea de detalle
        selectedPlan = $("#t4Plan").val();
        if (selectedPlan == 20) {
          doHider(false);
        } else {
          doHider(true);
        }
        break;
    }
  } catch (catchMsg) {
    rv = false;
    showNotyPopup(catchMsg.toString(), "errorModal");
  } finally {
    procesando("hide");
    return rv;
  }
}

async function saveF0511($saveData) {
  let rv, n;
  try {
    postParam = {
      action: "newEE",
      saveData: $saveData,
    };
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postParam),
      cache: "no-cache",
    };

    const dataResponse = await fetch("/ajax/A05.php", options);
    const dataJson = await dataResponse.json();

    if (dataJson.status != "ok") {
      throw dataJson.msg;
    } else {
      ShowNotyPopUp("Registro de Expediente Exitoso", "ok", "center");
      doP0511("blank");
    }
  } catch (catchMsg) {
    rv = false;
    showNotyPopup(catchMsg.toString(), "errorModal");
  } finally {
    procesando("hide");
    return rv;
  }
}

async function populatePlan($object, $selectedOption, $multiple = false) {
  if (false === $multiple) {
    var html = "";
    var selected = " selected";

    // siempre agrega la opcion de TODOS
    html += '<option value="0" ';
    html += ' ap="" ';
    html += ' og="" ';
    html += ' concepto="0" ';
    html += selected + ">(plan) Todos</option>";
    selected = "";

    _.each(planData, function (element, index, list) {
      if (0 == $selectedOption || element.concepto == $selectedOption) {
        html += '<option value="' + element.id + '" ';
        html += ' ap="' + element.ap + '" ';
        html += ' og="' + element.og + '" ';
        html += ' concepto="' + element.concepto + '" ';
        html += selected + ">" + element.nombre + "</option>";
        selected = "";
      }
    });
    $($object).html(html);
    let bar = await planChange();
    // let bar = await planChange( $selectedPlan );
  } else {
    // arma los select multiples
    // si no se selecciono ningun concepto, entonces toma todos los planes
    if ($selectedOption.length == 0) {
      _.each(conData, function (op, i) {
        $selectedOption.push(op.id);
      });
    }
    // arma las opciones para el select de Plan
    let newData = [];
    // si se selecciono mas de un Concepto, se agrupan los planes por Concepto
    const doGroups = $selectedOption.length > 1 ? true : false;
    _.each($selectedOption, function (concepto, ind, lis) {
      let newGroup = {
        label: $('#con_d option[value="' + concepto + '"]').text(),
        children: [],
      };
      let newTemp = [];
      _.each(planData, function (plan, index, list) {
        if (plan.concepto == concepto) {
          let newItem = { value: plan.id, label: plan.nombre };
          newTemp.push(newItem);
        }
      });

      if (doGroups) {
        newGroup.children = newTemp;
        newData.push(newGroup);
      } else {
        newData = newTemp;
      }
    });

    $($object).multiselect("rebuild");
    $($object).multiselect("dataprovider", newData);
  }

  return true;
}

async function planChange($selectedPlan = false, $control = "t4Plan") {
  if (false == $selectedPlan) {
    if ($("#" + $control).val() > 0) {
      $selectedPlan = $("#" + $control).val();
    } else {
      // #t4Plan es nulo
      return false;
    }
  }

  re46 = $selectedPlan == 20 ? true : false;
  let planId = "id_" + $selectedPlan;
  $("#t4APE1").val(planData[planId].ap);
  $("#t4OGA1").val(planData[planId].og);
  if (re46) {
    doHider(false);
    planId = "id_21";
    $("#t4APE2").val(planData[planId].ap);
    $("#t4OGA2").val(planData[planId].og);
  } else {
    doHider(true);
  }

  return true;
}

async function checkChanges($justCheck = true) {
  // si $justCheck == true: la función termina con el primer cambio que detecta, y devuelve FALSE
  let rv = {
    status: false,
    data: {},
    msg: "",
  };
  let fecha, checked;
  const wrError = {
    name: "wrError",
    message: "custom msg",
  };

  try {
    if ($("#f3Dependencia").val() != matrix.resumen[counterEE].dependencia) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.dependencia = $("#f3Dependencia").val();
    }
    if ($("#f3Estado").val() != matrix.resumen[counterEE].estado) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.estado = $("#f3Estado").val();
      // matrix.resumen[counterEE].estado = $('#f3Estado').val();
    }
    //agregado el 2021-01-14
    if ($("#f3Eje").val() != matrix.resumen[counterEE].eje) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.eje = $("#f3Eje").val();
      // matrix.resumen[counterEE].estado = $('#f3Estado').val();
    }

    if ($("#f3SG").val() != matrix.resumen[counterEE].comprobante) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.comprobante = $("#f3SG").val();
      // matrix.resumen[counterEE].comprobante = $('#f3SG').val();
    }
    if ($("#f3Observaciones").val() != matrix.resumen[counterEE].obs) {
      rv.data.obs = $("#f3Observaciones").val();
      // matrix.resumen[counterEE].obs = $('#f3Observaciones').val();
    }

    fecha = matrix.resumen[counterEE].fing || "";
    if ($("#f3FING").val() != fecha) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.fing = $("#f3FING").val();
      // matrix.resumen[counterEE].fing = $('#f3FING').val();
    }

    fecha = matrix.resumen[counterEE].fum || "";
    if ($("#f3FUM").val() != fecha) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.fum = $("#f3FUM").val();
      // matrix.resumen[counterEE].fum = $('#f3FUM').val();
    }
    fecha = matrix.resumen[counterEE].fpre || "";
    if ($("#f3FPRE").val() != fecha) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.fprev = $("#f3FPRE").val();
      // matrix.resumen[counterEE].fpre = $('#f3FPRE').val();
    }

    fecha = matrix.resumen[counterEE].fdev || "";
    if ($("#f3FDEV").val() != fecha) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.fdev = $("#f3FDEV").val();
      // matrix.resumen[counterEE].fdev = $('#f3FDEV').val();
    }
    fecha = matrix.resumen[counterEE].fpag || "";
    if ($("#f3FPAG").val() != fecha) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.fpag = $("#f3FPAG").val();
      // matrix.resumen[counterEE].fpag = $('#f3FPAG').val();
    }

    checked = matrix.resumen[counterEE].dictamen == "1" ? true : false;
    if ($("#f3Dictamen").prop("checked") !== checked) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.dictamen = $("#f3Dictamen").prop("checked");
      // matrix.resumen[counterEE].dictamen = $( "#f3Dictamen" ).prop( "checked");
    }

    checked = matrix.resumen[counterEE].acto == "1" ? true : false;
    if ($("#f3Acto").prop("checked") !== checked) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.acto = $("#f3Acto").prop("checked");
      // matrix.resumen[counterEE].acto = $( "#f3Acto" ).prop( "checked");
    }

    // agregado el 2020-11-24
    if ($("#f3Liquidacion").val() != matrix.resumen[counterEE].liquidacion) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.liquidacion = $("#f3Liquidacion").val();
      // matrix.resumen[counterEE].liquidacion = $('#f3Liquidacion').val();
    }
    fecha = matrix.resumen[counterEE].periodo || "";
    if ($("#f3PeriodoIni").val() != fecha) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.periodo = $("#f3PeriodoIni").val();
      // matrix.resumen[counterEE].periodo = $('#f3PeriodoIni').val();
    }
    fecha = matrix.resumen[counterEE].periodo_fin || "";
    if ($("#f3PeriodoFin").val() != fecha) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.periodo_fin = $("#f3PeriodoFin").val();
      // matrix.resumen[counterEE].periodo_fin = $('#f3PeriodoFin').val();
    }
    if ($("#f3Usuario").val() != matrix.resumen[counterEE].ualta) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.ualta = $("#f3Usuario").val();
      // matrix.resumen[counterEE].ualta = $('#f3Usuario').val();
    }
    // agregado el 2021-01-05
    if ($("#f3Useg").val() != matrix.resumen[counterEE].useg) {
      if ($justCheck) {
        throw wrError;
      }
      rv.data.useg = $("#f3Useg").val();
      // matrix.resumen[counterEE].ualta = $('#f3Usuario').val();
    }

    if (true === $justCheck) {
      // no encontró ningun cambio, devuelve TRUE
      rv.status = true;
    }

    // el chequeo es previo a guardar, tira un error si no hay nada para grabar
    if (0 == _.keys(rv.data).length) {
      throw "No hay nada para grabar";
    } else {
      rv.status = true;
    }
  } catch (e) {
    if (e.name == "wrError") {
      // no hace nada, solo sale de la funcion con status = FALSE
    } else {
      rv.msg = e.toString();
      // console.error( e.toString() ) ;
    }
  } finally {
    return rv;
  }
}

async function saveEE(saveData = false, ee = false) {
  let rv = false;

  try {
    if (false === saveData || false === ee) {
      throw "Faltan parámetros en la función saveEE()";
    }
    postParam = {
      action: "saveEE",
      saveData: saveData,
    };
    options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postParam),
      cache: "no-cache",
    };
    dataResponse = await fetch("/ajax/A05.php", options);
    dataJson = await dataResponse.json();
    // cierra modal
    $.unblockUI();
    // verifica ajax
    if (dataJson.status != "ok") {
      throw dataJson.msg;
    }

    // actualizacion ok,

    // actualiza campos de pantalla
    _.each(saveData[ee], function (newData, index) {
      switch (index) {
        case "dependencia":
          $("#f3Dependencia").multiselect("deselectAll", false);
          $("#f3Dependencia").multiselect("select", newData);
          $("#f3Dependencia").multiselect("refresh");
          matrix.resumen[counterEE].dependencia = newData;
          break;
        case "estado":
          $("#f3Estado").val(newData); // ojo cambiar cuando se vuelva multiselect
          matrix.resumen[counterEE].estado = newData;
          break;
        //agregado el 2021-01-14
        case "eje":
          $("#f3Eje").val(newData);
          matrix.resumen[counterEE].eje = newData;
          break;

        case "acto":
          $("#f3Acto").prop("checked", newData);

          break;
        case "dictamen":
          $("#f3Dictamen").prop("checked", newData);
          break;
        case "obs":
          $("#f3Observaciones").val(newData);
          matrix.resumen[counterEE].obs = newData;
          break;
        case "fum":
          $("#f3FUM").val(newData);
          matrix.resumen[counterEE].fum = newData;
          break;
        case "fing":
          $("#f3FING").val(newData);
          matrix.resumen[counterEE].fing = newData;
          break;
        case "fdev":
          $("#f3FDEV").val(newData);
          matrix.resumen[counterEE].fdev = newData;
          break;
        case "fpag":
          $("#f3FPAG").val(newData);
          matrix.resumen[counterEE].fpag = newData;
          break;

        // campos que no pasan por modal
        case "comprobante":
          matrix.resumen[counterEE].comprobante = newData;
          break;
        case "fpre":
          matrix.resumen[counterEE].fpre = newData;
          break;
        case "liquidacion":
          matrix.resumen[counterEE].liquidacion = newData;
          break;
        case "periodo":
          matrix.resumen[counterEE].periodo = newData;
          break;
        case "periodo_fin":
          matrix.resumen[counterEE].periodo_fin = newData;
          break;
        case "ualta":
          matrix.resumen[counterEE].ualta = newData;
          break;
        case "useg":
          matrix.resumen[counterEE].useg = newData;
          break;

        default:
          // no hace nada por default
          break;
      }
    });

    // actualiza internamente  la fecha de seguimiento
    //
    ahora = moment().format("YYYY-MM-DD HH:mm:ss");
    matrix.resumen[counterEE].fmodi = ahora;
    $("#f3FSEG").val(ahora);
    $("#f3FSEG").addClass("bg-success");
    ShowNotyPopUp("Se actualizó el expediente " + ee, "ok", "center");
    rv = true;
  } catch (e) {
    showNotyPopup(e.toString(), "errorModal");
  } finally {
    return rv;
  }
}

async function toExcel0501c() {
  let rv, n;
  procesando("show");
  try {
    n = new Noty({
      theme: "metroui",
      layout: "center",
      type: "alert",

      text: "Confirma generar el archivo Excel? ",
      buttons: [
        Noty.button("SI", "btn btn-success btn-block px-3", function () {
          n.close();
          doReport0501c();
        }),

        Noty.button("NO", "btn btn-danger btn-block px-3", function () {
          n.close();
        }),
      ],
    });
    n.show();
  } catch (catchMsg) {
    rv = false;
    procesando("hide");
    showNotyPopup(catchMsg.toString(), "errorModal");
  } finally {
    return rv;
  }
}

async function doReport0501c() {
  let rv, dataResponse, dataJson, $filter, $eje, $auditoria;

  try {
    procesando("show");

    //arma los principales array a pasar como parametros a r2xlsx.php

    let r2x = {
      table: "f0501",
      fields: [
        "concepto",
        "plan",
        "sector",
        "subsector",
        "saf",
        "eco",
        "pg",
        "sp",
        "py",
        "ac",
        "ob",
        "inc",
        "pri",
        "par",
        "sup",
        "fue",
        "ubi",
        "bapin",
        "pex",
        "d_pg",
        "d_sp",
        "d_py",
        "d_ac",
        "d_ob",
        "d_inc",
        "d_pri",
        "d_par",
        "d_sup",
      ],
      values: [
        "inicial",
        "vigente",
        "preventivo",
        "compromiso",
        "devengado",
        "pagado",
        "dispo_comp",
        "dispo_dev",
        "dispo_gastar",
        "pagadofin",
        "pagadototal",
        "potencial",
        "distribuido",
        "restringido",
        "reserva_comp",
        "reserva_dev",
      ],
      calculated: [
        {
          name: "DeudaExigible",
          type: "number",
          formula: "devengado - pagado",
        },
      ],
      filter: "",
      aux: {},
      basic: {},
    };

    // completo esqueleto del aux
    let aux = {
      show: false,
      title: "",
      type: "text",
      db: "",
    };
    // primero los campos descriptivos
    r2x.fields.forEach((field) => {
      r2x.aux[field] = {
        show: false,
        title: field,
        type: "string",
        db: field,
      };
    });
    // segundo los campos de datos numericos

    r2x.values.forEach((field) => {
      r2x.aux[field] = {
        show: false,
        title: field,
        type: "number",
        db: field,
      };
    });

    // tercero  los campos de datos calculados

    r2x.calculated.forEach((field) => {
      r2x.aux[field.name] = {
        show: false,
        title: field.name,
        type: field.type,
        db: field,
      };
    });

    // completo datos fijos
    r2x.aux.concepto.db = "d_concepto";
    r2x.aux.plan.db = "d_plan";
    r2x.aux.sector.db = "d_sector";
    r2x.aux.subsector.db = "d_subsector";

    r2x.aux.fue.title = "Fuente";

    r2x.aux.d_pg.title = "Programa";
    r2x.aux.d_sp.title = "Sub Programa";
    r2x.aux.d_py.title = "Proyecto";
    r2x.aux.d_ac.title = "Actividad";
    r2x.aux.d_ob.title = "Obra";
    r2x.aux.d_inc.title = "Inciso";
    r2x.aux.d_pri.title = "Principal";
    r2x.aux.d_par.title = "Parcial";
    r2x.aux.d_sup.title = "Sub Parcial";

    // completo el filtro
    let filters = await getInputs0501c("filters");
    let postParam = {
      action: "table0501c",
      data: filters,
      setWhere: true,
    };
    let postOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postParam),
      cache: "no-cache",
    };
    let ajaxResponse = await fetch("/ajax/A05.php", postOptions);
    let dataJson = await ajaxResponse.json();
    if (dataJson.status != "ok") {
      throw dataJson.msg;
    }
    r2x.filter = dataJson.data;

    // get report options
    let reportOptions = await getInputs0501c("options");

    // agrega a la lista de campos, los elegidos para tener descripcion
    reportOptions["columnas"]["descripcion"].forEach((field) => {
      // reportOptions['columnas']['incluir'].push( fieldDescription[field]  );
      reportOptions["columnas"]["incluir"].push("d_" + field);
    });

    // marca los campos a incluir en el excel
    // 1. columnas
    reportOptions.columnas.incluir.forEach((field) => {
      r2x.aux[field].show = true;
    });
    // 2. datos numericos
    reportOptions.indicadores.forEach((field) => {
      r2x.aux[field].show = true;
    });

    // incorpora los datos basicos

    _.each(reportOptions.basico, function (value, key) {
      r2x.basic[key] = value;
    });

    // throw 'fin debug';
    postParam = { download: true, data: r2x };
    options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postParam),
      cache: "no-cache",
    };

    _debug(r2x, "r2x");

    dataResponse = await fetch("/ajax/r2xlsx.php", options);
    dataJson = await dataResponse.json();

    if (dataJson.status != "ok") {
      throw dataJson.msg;
    } else {
      ShowNotyPopUp("Reporte generado en forma correcta", "ok");
      let form = document.createElement("form");
      form.setAttribute("method", "post");
      form.setAttribute("action", "/ajax/fileDownload.php");
      form.setAttribute("target", "_self");
      let params = { wrName: dataJson.fileName, wrFileName: dataJson.filePath };
      for (var i in params) {
        if (params.hasOwnProperty(i)) {
          let input = document.createElement("input");
          input.type = "hidden";
          input.name = i;
          input.value = params[i];
          form.appendChild(input);
        }
      }
      document.body.appendChild(form);
      form.submit();
      document.body.removeChild(form);
    }

    // reporte generado
    // else {
    //   ShowNotyPopUp('Reporte generado en forma correcta', 'ok'  );
    //   let form = document.createElement("form");
    //   form.setAttribute("method", "post");
    //   form.setAttribute("action", '/ajax/fileDownload.php');
    //   form.setAttribute("target", '_self');
    //   let params = {wrName : dataJson.fileName , wrFileName : dataJson.filePath};
    //   for (var i in params) {
    //       if (params.hasOwnProperty(i)) {
    //           let input = document.createElement('input');
    //           input.type = 'hidden';
    //           input.name = i;
    //           input.value = params[i];
    //           form.appendChild(input);
    //       }
    //   };
    //   document.body.appendChild(form);
    //   form.submit();
    //   document.body.removeChild(form);

    // }
    rv = true;
  } catch (catchMsg) {
    rv = false;
    showNotyPopup("doReport() " + catchMsg.toString(), "errorModal");
  } finally {
    procesando("hide");
    return rv;
  }
}

async function getInputs0501c($type = false) {
  let rv;
  // datos auxiliares
  let fields = [
    "jur",
    "saf",
    "pg",
    "sp",
    "py",
    "ac",
    "ob",
    "inc",
    "pri",
    "par",
    "sup",
    "fue",
    "eco",
    "ubi",
    "bap",
    "pex",
  ];
  let subfixes = ["d", "h", "m"];
  let fieldName;

  switch ($type) {
    case "filters":
      rv = {
        concepto: $("#con_d").val(),
        plan: $("#pla_d").val(),
        sector: $("#sec_d").val(),
        subsector: $("#sub_d").val(),
      };
      fields.forEach((field) => {
        subfixes.forEach((subfix) => {
          fieldName = field + "_" + subfix;
          rv[fieldName] = $("#" + fieldName).val();
        });
      });

      break;

    case "options":
      rv = {
        basico: {
          titulo: $("#x_titulo").val(),
          font: $("#x_font").val(),
          size: $("#x_size").val(),
          autofilter: $("#x_autofiltro").is(":checked"),
          titulos: $("#x_titulos").is(":checked"),
        },
        columnas: {
          incluir: [],
          descripcion: [],
        },
        indicadores: [],
      };
      let subfixName;

      // pestaña Opciones Avanzadas - Columnas
      fields.push("concepto", "plan", "sector", "subsector");

      subfixes = ["i", "e"];
      fields.forEach((field) => {
        subfixes.forEach((subfix) => {
          fieldName = field + "_" + subfix;
          subfixName = "i" == subfix ? "incluir" : "descripcion";
          if (true == $("#" + fieldName).is(":checked")) {
            rv["columnas"][subfixName].push(field);
          }
        });
      });

      // pestaña Opciones Avanzadas - datos numericos
      fields = [
        "inicial",
        "vigente",
        "potencial",
        "distribuido",
        "restringido",
        "preventivo",
        "compromiso",
        "devengado",
        "pagado",
        "pagadofin",
        "pagadototal",
        "reserva_dev",
        "reserva_comp",
        "dispo_comp",
        "dispo_dev",
        "dispo_gastar",
        "DeudaExigible",
      ];

      fields.forEach((field) => {
        fieldName = field + "_i";
        if (true == $("#" + fieldName).is(":checked")) {
          rv["indicadores"].push(field);
        }
      });
      break;

    default:
      rv = false;
  }
  return rv;
}

async function doTable0501c(action = "update") {
  let rv;

  tableExportTitle = "Créditos ESIDIF";

  procesando("show");

  try {
    let formData = await getInputs0501c("filters");

    $mode = $("#cbLimitativo")[0].checked;

    const postParam = {
      action: "table0501c",
      data: formData,
      mode: $mode,
    };

    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(postParam),
      cache: "no-cache",
    };

    const dataResponse = await fetch("/ajax/A05.php", options);
    const dataJson = await dataResponse.json();

    if (dataJson.status != "ok") {
      dataJson.data = [];
      throw dataJson.msg;
    }

    const $columns = await doColumns($mode);

    if (action == "create") {
      CustomButtons = "";

      let tableH = window.innerHeight - 100 + "px";

      table0501c = new Tabulator("#Tabulator01c", {
        // height:"400px",
        height: "tableH",
        data: dataJson.data,
        layout: "fitDataFill", // fitData  fitColumns fitDataFill
        resizableRows: true,
        resizableColumns: true,
        placeholder: "Sin datos disponibles", //display message to user on empty table
        clipboard: "copy",
        footerElement: CustomButtons,
        locale: "es-ar",
        pagination: "local",
        paginationSize: 15,
        paginationSizeSelector: [5, 10, 25, 50, 100],
        langs: tabulatorLang,
        movableColumns: true,
        // dataTree:true,
        // dataTreeStartExpanded:false,
        /*
        // modificador el 2021-12-16 - limitativo
        columns: [
          {
            title: "Concepto",
            field: "d_concepto",
            width: 125,
            // hozAlign: "center",
            bottomCalc: totalCalc,
            headerSort: true,
            // formatter: "lookup",
            // formatterParams: tabulatorSelectors.concepto,
            frozen: true
          }, {
              title: "Plan",
              field: "d_plan",
              width: 135,
              // hozAlign: "center",
              headerSort: true,
              // formatter: "lookup",
              // formatterParams: tabulatorSelectors.plan,
              frozen: true
          }, 

          {
              title: "SAF",
              field: "saf",
              width: 65,
              // width: 75,
              hozAlign: "center",
              sorter: "number",
              headerSort: true,
              frozen: true
          },
          {
              title: "Ap.Prog.",
              field: "ape",
              width: 85,
              hozAlign: "center",
              headerSort: true,
              frozen: true
          },
          {
              title: "Obj.Gasto",
              field: "oga",
              width: 85,
              hozAlign: "center",
              headerSort: true,
              frozen: true,
          },
          {
              title: "FF",
              field: "fue",
              width: 50,
              hozAlign: "center",
              headerSort: true
          },
          {
              title: "UG",
              field: "ubi",
              width: 50,
              hozAlign: "center",
              headerSort: true
          },
          {
              title: "Incial",
              field: "inicial",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "Vigente",
              field: "vigente",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "Deuda Exig.",
              field: "DeudaExigible",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "Dispo.Gastar",
              field: "dispo_gastar",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "Preventivo",
              field: "preventivo",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "Comprometido",
              field: "compromiso",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "Devengado",
              field: "devengado",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "Pagado",
              field: "pagado",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "P.Financiero",
              field: "pagadofin",
              width: 100,
              hozAlign: "right",
              bottomCalc: "sum",
              bottomCalcFormatter: "money",
              bottomCalcFormatterParams: wrFormatNumber,
              formatter: "money",
              formatterParams: wrFormatNumber,
              sorter: "number",
              accessorParams: {},
              accessor: caMoneda,
          },
          {
              title: "Econ.",
              field: "eco",
              width: 60,
              hozAlign: "center",
              headerSort: true
          },
          {
              title: "Sector",
              field: "d_sector",
              width: 120,
              hozAlign: "center",
              headerSort: true
          },
          {
              title: "SubSector",
              field: "d_subsector",
              width: 120,
              hozAlign: "center",
              headerSort: true
          },
          {
              title: "BAPIN",
              field: "bapin",
              width: 75,
              hozAlign: "center",
              headerSort: true
          },
          {
              title: "PEX",
              field: "pex",
              width: 75,
              hozAlign: "center",
              headerSort: true
          },

              // {title:"Curva", field:"curva", width:75, 
              //   formatter:lineFormatter, headerSort:false , download:false},
              // {title:"%/Total", field:"ratio", width:100 ,align:"center" ,
              // accessorParams:{}, accessor:caPorcentaje,
              // formatter:function(cell, formatterParams, onRendered){
              //     return numeral(cell.getValue()).format('0.0%');  
              // }, 
              // sorter:"number"},
              // {title:"Progress", field:"progress", formatter:"progress", sorter:"number"},
              // {title:"Gender", field:"gender"},
              // {title:"Rating", field:"rating", formatter:"star", align:"center", width:100},
              // {title:"Favourite Color", field:"col"},
              // {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
              // {title:"Driver", field:"car", align:"center", formatter:"tickCross"},
        ],
        */
        columns: $columns,
        // initialSort:[
        //     {column:"faut", dir:"desc"}, //sort by this first
        // ],
      });
    } else {
      table0501c.replaceData(dataJson.data);
      ShowNotyPopUp(
        "Se han actualizado los datos de la tabla",
        "ok_fast",
        "center"
      );
    }
    rv = true;
    tableObject = table0501c;
    $("#Tabulator01c").removeClass("d-none");
  } catch (catchMsg) {
    rv = false;
    showNotyPopup(catchMsg.toString(), "errorModal");
  } finally {
    procesando("hide");
    return rv;
  }
}

async function doColumns($mode) {
  rv = "";
  if ($mode === true) {
    rv = [
      {
        title: "Concepto",
        field: "d_concepto",
        width: 125,
        // hozAlign: "center",
        bottomCalc: totalCalc,
        headerSort: true,
        // formatter: "lookup",
        // formatterParams: tabulatorSelectors.concepto,
        frozen: true,
      },
      {
        title: "Plan",
        field: "d_plan",
        width: 135,
        // hozAlign: "center",
        headerSort: true,
        // formatter: "lookup",
        // formatterParams: tabulatorSelectors.plan,
        frozen: true,
      },

      {
        title: "SAF",
        field: "saf",
        width: 65,
        // width: 75,
        hozAlign: "center",
        sorter: "number",
        headerSort: true,
        frozen: true,
      },
      {
        title: "Ap.Prog.",
        field: "ape",
        width: 85,
        hozAlign: "center",
        headerSort: true,
        frozen: true,
      },
      {
        title: "Obj.Gasto",
        field: "oga",
        width: 85,
        hozAlign: "center",
        headerSort: true,
        frozen: true,
      },
      {
        title: "FF",
        field: "fue",
        width: 50,
        hozAlign: "center",
        headerSort: true,
      },
      {
        title: "UG",
        field: "ubi",
        width: 50,
        hozAlign: "center",
        headerSort: true,
      },
      {
        title: "Incial",
        field: "inicial",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Vigente",
        field: "vigente",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Deuda Exig.",
        field: "DeudaExigible",
        width: 120,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      // MODIFICADO EL 2022-06-13
      // SE PONE DISPONIBLE AL COMPROMISO EN VEZ DE
      // DISPONIBLE _GASTAR
      {
        //title: "Dispo.Gastar",
        //field: "dispo_gastar",
        title: "Dispo.Compromiso",
        field: "dispo_comp",
        width: 150,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Preventivo",
        field: "preventivo",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Comprometido",
        field: "compromiso",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Devengado",
        field: "devengado",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Pagado",
        field: "pagado",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "P.Financiero",
        field: "pagadofin",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Econ.",
        field: "eco",
        width: 60,
        hozAlign: "center",
        headerSort: true,
      },
      {
        title: "Sector",
        field: "d_sector",
        width: 120,
        hozAlign: "center",
        headerSort: true,
      },
      {
        title: "SubSector",
        field: "d_subsector",
        width: 120,
        hozAlign: "center",
        headerSort: true,
      },
      {
        title: "BAPIN",
        field: "bapin",
        width: 75,
        hozAlign: "center",
        headerSort: true,
      },
      {
        title: "PEX",
        field: "pex",
        width: 75,
        hozAlign: "center",
        headerSort: true,
      },

      // {title:"Curva", field:"curva", width:75,
      //   formatter:lineFormatter, headerSort:false , download:false},
      // {title:"%/Total", field:"ratio", width:100 ,align:"center" ,
      // accessorParams:{}, accessor:caPorcentaje,
      // formatter:function(cell, formatterParams, onRendered){
      //     return numeral(cell.getValue()).format('0.0%');
      // },
      // sorter:"number"},
      // {title:"Progress", field:"progress", formatter:"progress", sorter:"number"},
      // {title:"Gender", field:"gender"},
      // {title:"Rating", field:"rating", formatter:"star", align:"center", width:100},
      // {title:"Favourite Color", field:"col"},
      // {title:"Date Of Birth", field:"dob", align:"center", sorter:"date"},
      // {title:"Driver", field:"car", align:"center", formatter:"tickCross"},
    ];
  } else {
    rv = [
      {
        title: "SAF",
        field: "saf",
        width: 65,
        // width: 75,
        hozAlign: "center",
        sorter: "number",
        headerSort: true,
        frozen: true,
      },
      {
        title: "Ap.Prog.",
        field: "ape",
        width: 85,
        hozAlign: "center",
        headerSort: true,
        frozen: true,
      },
      {
        title: "Obj.Gasto",
        field: "oga",
        width: 85,
        hozAlign: "center",
        headerSort: true,
        frozen: true,
      },
      {
        title: "FF",
        field: "fue",
        width: 50,
        hozAlign: "center",
        headerSort: true,
      },
      {
        title: "Incial",
        field: "inicial",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Vigente",
        field: "vigente",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Deuda Exig.",
        field: "DeudaExigible",
        width: 120,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      // MODIFICADO EL 2022-06-13
      // SE PONE DISPONIBLE AL COMPROMISO EN VEZ DE
      // DISPONIBLE _GASTAR
      {
        //title: "Dispo.Gastar",
        //field: "dispo_gastar",
        title: "Dispo.Compromiso",
        field: "dispo_comp",
        width: 150,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Preventivo",
        field: "preventivo",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Comprometido",
        field: "compromiso",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Devengado",
        field: "devengado",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Pagado",
        field: "pagado",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "P.Financiero",
        field: "pagadofin",
        width: 100,
        hozAlign: "right",
        bottomCalc: "sum",
        bottomCalcFormatter: "money",
        bottomCalcFormatterParams: wrFormatNumber,
        formatter: "money",
        formatterParams: wrFormatNumber,
        sorter: "number",
        accessorParams: {},
        accessor: caMoneda,
      },
      {
        title: "Econ.",
        field: "eco",
        width: 60,
        hozAlign: "center",
        headerSort: true,
      },
    ];
  }
  return rv;
}

function multipleSelectChange(option, checked, select) {
  _debug("multipleSelectChange");

  // actualiza el valor del campo en base a lo seleccionado en el asistente visual
  dropDown = true;
  let newData = "",
    newTitle = "",
    newPrefix = "";
  if ("m" == currentType) {
    if ($("#multiSelect").val()) {
      _.each($("#multiSelect").val(), function ($id, index) {
        newPrefix = newData ? " , " : "";
        newData += newPrefix + f0593[$id].codigo;
        newTitle += newPrefix + f0593[$id].label;
      });
    } else {
      newData = "";
      newTitle = "";
    }
  } else {
    newData = f0593[$(option).val()].codigo;
    newTitle = $(option).text();
  }

  $("#" + currentControl).val(newData);
  $("#" + currentControl).prop("title", newTitle);
}

// agregada el 2021-07-26 para p0511c
function doFilter() {
  let rv = {
    eje: $("#eje").val(),
    concepto: $("#t4Concepto").val(),
    plan: $("#t4Plan").val(),
    dependencia: $("#dependencia").val(),
    beneficiario: $("#beneficiario").val(),
    periodo: $("#periodo").val(),
    fuente: $("#fuente").val(),
    expediente: $("#expediente").val(),
    obs: $("#obs").val(),
    descripcion: $("#descripcion").val(),
    estado: $("#estado").val(),
    comprobante: $("#comprobante").val(),
    ap: $("#ap").val(),
    og: $("#og").val(),
    dictamen: $("#dictamen").prop("checked"),
    acto: $("#acto").prop("checked"),
    fprev: $("#fprev").val(),
    fpag: $("#fpag").val(),
    fdev: $("#fdev").val(),
    fidp: $("#fidp").val(),
    fing: $("#fing").val(),
    fum: $("#fum").val(),
  };
  return rv;
}
