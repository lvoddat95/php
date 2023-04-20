var _CONST = {
    "_MA_NHOM_KPI_CA_NHAN": 'CCD19A53-53C8-4A72-A11E-2F4395872E55',
    "_MA_NHOM_KPI_PHONG_BAN": '06AB1486-C4E8-4386-9D91-F00283968FA5',
    "_CONST_KIEU_CHAM_TEXT": 1,
    "_CONST_KIEU_CHAM_SELECT": 2,
    "_CONST_KIEU_CHAM_RADIO": 3,
    "_CONST_KIEU_CHAM_DOANH_THU": 4,
    "_CONST_KIEU_CHAM_BOI_THUONG": 5,
    "_CONST_TEN_BO_KPIs_BEFORE": "BỘ KPIs",
    "_CONST_TEN_BO_KPIs_AFTER": "NĂM " + new Date().getFullYear(),
};


// ham btn_save_onclick() duoc goi khi NSD nhan chuot vao nut "Chap nhan"
//  - p_fuseaction: ten fuseaction tiep theo
function btn_save_onclick(p_frm, p_fuseaction) {
    if (_MODAL_DIALOG_MODE == 1)
        p_frm.action = "index.php?modal_dialog_mode=1";
    else
        p_frm.action = "index.php";

    if (verify(p_frm)) {
        p_frm.fuseaction.value = p_fuseaction;
        p_frm.submit();
    }
}
// Ham check all cac checkbox tren man hinh danh sach
function check_all(p_frm, chk_object) {
    var v_is_checked = chk_object.checked;
    var v_record_count = p_frm.hdn_record_count.value * 1;
    for (var i = 0; i < v_record_count; i++) {
        var p_check_obj = eval("p_frm.chk_item_id" + i);
        if (p_check_obj) {
            p_check_obj.checked = v_is_checked;
        }
    }
}

function check_all_by_class(p_class_name, p_status, p_callback) {
    $('.' + p_class_name).attr('checked', p_status);
    if (p_callback != null && p_callback != '') {
        p_callback();
    }
}

function check_checkbox_by_id(p_checkbox_id, p_status) {
    document.getElementById(p_checkbox_id).checked = p_status;
}

function check_checkbox_by_input(p_checkbox_id, p_input_id) {
    v_input_value = document.getElementById(p_input_id).value;
    check_checkbox_by_id(p_checkbox_id + v_input_value, true);
    window.location.hash = p_checkbox_id + v_input_value;
}

function list_check_has_checked(p_forms, p_item_id) {
    var v_record_count = p_forms.hdn_record_count.value * 1;
    for (var i = 0; i < v_record_count; i++) {
        var p_check_obj = eval("p_forms." + p_item_id + i);
        if (p_check_obj && p_check_obj.checked == true) {
            return true;
        }
    }
}

function btn_delete_onclick(p_forms, p_action_url, p_target, p_class_button) {
    v_class_button = (typeof (p_class_button) === 'undefined') ? '' : p_class_button;
    v_is_ok = false;
    if (list_check_has_checked(p_forms, 'chk_item_id')) {
        // optionsAlert.title = "Thông báo";
        optionsAlert.html = "Bạn có chắc chắn muốn xóa các đối tượng đã chọn không ?";
        Swal.fire(optionsAlert).then((result) => {
            if (result.isConfirmed) {
                frm_submit(p_forms, p_action_url, p_target);
                v_is_ok = true;
            }
        });
    } else {
        _alert('Chưa có đối tượng nào được chọn!');
    }
    if (!v_is_ok && v_class_button != '') {
        set_enable_link(v_class_button);
    }
}


function btn_delete(p_forms, p_action_url, p_target, p_class_button) {
    v_class_button = (typeof (p_class_button) === 'undefined') ? '' : p_class_button;
    v_is_ok = false;
    if (list_check_has_checked(p_forms, 'chk_item_id')) {
        frm_submit(p_forms, p_action_url, p_target);
        v_is_ok = true;
    } else {
        _alert('Chưa có đối tượng nào được chọn!');
    }
    if (!v_is_ok && v_class_button != '') {
        set_enable_link(v_class_button);
    }
}

function btn_remove_onclick(p_forms, p_action_url, p_target, have_item_id) {
    if (have_item_id || list_check_has_checked(p_forms, 'chk_item_id')) {
        if (confirm('Đối tượng này sẽ bị xóa hẳn không thể khôi phục được.' + "\n" + 'Bạn có chắc chắn xóa không?')) {
            frm_submit(p_forms, p_action_url, p_target);
        }
    } else {
        alert('Chưa có đối tượng nào được chọn!');
    }
}


function btn_update_list_onclick(p_forms, p_action_url, p_target) {
    frm_submit(p_forms, p_action_url, p_target);
}

function frm_submit(p_forms, p_action_url, p_target) {
    if (p_action_url) {
        p_forms.action = p_action_url;
    } else {
        p_forms.action = "";
    }
    if (p_target) {
        p_forms.target = p_target;
    } else {
        p_forms.target = "";
    }

    p_forms.submit();
}

function frm_submit_DNTT(p_forms, p_action_url, p_target) {
    if (p_action_url) {
        p_forms.action = p_action_url;
    } else {
        p_forms.action = "";
    }
    if (p_target) {
        p_forms.target = p_target;
    } else {
        p_forms.target = "";
    }

    p_forms.submit();
}

// Valid number
function isnum(passedVal) {
    if (passedVal == "") {
        return false;
    }
    for (i = 0; i < passedVal.length; i++) {
        if (passedVal.charAt(i) < "0") {
            return false;
        }
        if (passedVal.charAt(i) > "9") {
            return false;
        }
    }
    return true;
}

// Valid double
function isdouble(passedVal) {
    if (passedVal == "") {
        return false;
    }
    // if there are more character ".", it is invalid double
    if (count_char(passedVal, '.') > 1)
        return false;
    for (i = 0; i < passedVal.length; i++) {
        if (passedVal.charAt(i) != "." && passedVal.charAt(i) < "0") {
            return false;
        }
        if (passedVal.charAt(i) != "." && passedVal.charAt(i) > "9") {
            return false;
        }
    }
    return true;
}
// Valid float
function isfloat(passedVal) {
    if (passedVal == "") {
        return false;
    }
    // if there are more character ".", it is invalid float
    if (count_char(passedVal, '.') > 1)
        return false;
    // if there are more character "-", it is invalid float
    if (count_char(passedVal, '-') > 1)
        return false;
    if (passedVal.indexOf('-') > 0)
        return false;
    passedVal = passedVal.substring(1);
    for (i = 0; i < passedVal.length; i++) {
        if (passedVal.charAt(i) != "." && passedVal.charAt(i) < "0") {
            return false;
        }
        if (passedVal.charAt(i) != "." && passedVal.charAt(i) > "9") {
            return false;
        }
    }
    return true;
}

//Checking email;

function isemail(email) {
    var invalidChars = "/ :,;";

    if (email == "") {
        return false;
    }

    for (i = 0; i < invalidChars.length; i++) {
        badChar = invalidChars.charAt(i);
        if (email.indexOf(badChar, 0) > -1) {
            return false;
        }
    }
    atPos = email.indexOf("@", 1)
    if (atPos == -1) {
        return false;
    }
    if (email.indexOf("@", atPos + 1) > -1) {
        return false;
    }
    periodPos = email.indexOf(".", atPos);
    if (periodPos == -1) {
        return false;
    }
    if (periodPos + 3 > email.length) {
        return false;
    }
    return true;
}

// Check date
function isdate(the_date) {
    var strDatestyle = "EU"; //European date style
    var strDate;
    var strDateArray;
    var strDay;
    var strMonth;
    var strYear;
    var intday;
    var intMonth;
    var intYear;
    var booFound = false;
    var strSeparatorArray = new Array("-", " ", "/", ".");
    var intElementNr;
    var err = 0;
    var strMonthArray = new Array(12);

    strMonthArray[0] = "Jan";
    strMonthArray[1] = "Feb";
    strMonthArray[2] = "Mar";
    strMonthArray[3] = "Apr";
    strMonthArray[4] = "May";
    strMonthArray[5] = "Jun";
    strMonthArray[6] = "Jul";
    strMonthArray[7] = "Aug";
    strMonthArray[8] = "Sep";
    strMonthArray[9] = "Oct";
    strMonthArray[10] = "Nov";
    strMonthArray[11] = "Dec";

    strDate = the_date;

    if (strDate == "") {
        return false;
    }
    for (intElementNr = 0; intElementNr < strSeparatorArray.length; intElementNr++) {
        if (strDate.indexOf(strSeparatorArray[intElementNr]) != -1) {
            strDateArray = strDate.split(strSeparatorArray[intElementNr]);
            if (strDateArray.length != 3) {
                err = 1;
                return false;
            } else {
                strDay = strDateArray[0];
                strMonth = strDateArray[1];
                strYear = strDateArray[2];
            }
            booFound = true;
        }
    }
    if (booFound == false) {
        if (strDate.length > 5) {
            strDay = strDate.substr(0, 2);
            strMonth = strDate.substr(2, 2);
            strYear = strDate.substr(4);
        } else {
            return false;
        }
    }
    if (strYear.length == 2) {
        strYear = '20' + strYear;
    }
    // US style
    if (strDatestyle == "US") {
        strTemp = strDay;
        strDay = strMonth;
        strMonth = strTemp;
    }

    if (!isnum(strDay)) {
        err = 2;
        return false;
    }

    intday = parseInt(strDay, 10);
    if (isNaN(intday)) {
        err = 2;
        return false;
    }

    if (!isnum(strMonth)) {
        err = 3;
        return false;
    }
    intMonth = parseInt(strMonth, 10);
    if (isNaN(intMonth)) {
        for (i = 0; i < 12; i++) {
            if (strMonth.toUpperCase() == strMonthArray[i].toUpperCase()) {
                intMonth = i + 1;
                strMonth = strMonthArray[i];
                i = 12;
            }
        }
        if (isNaN(intMonth)) {
            err = 3;
            return false;
        }
    }

    if (!isnum(strYear)) {
        err = 4;
        return false;
    }

    intYear = parseInt(strYear, 10);
    if (isNaN(intYear)) {
        err = 4;
        return false;
    }
    if (intMonth > 12 || intMonth < 1) {
        err = 5;
        return false;
    }
    if ((intMonth == 1 || intMonth == 3 || intMonth == 5 || intMonth == 7 || intMonth == 8 || intMonth == 10 || intMonth == 12) && (intday > 31 || intday < 1)) {
        err = 6;
        return false;
    }
    if ((intMonth == 4 || intMonth == 6 || intMonth == 9 || intMonth == 11) && (intday > 30 || intday < 1)) {
        err = 7;
        return false;
    }
    if (intMonth == 2) {
        if (intday < 1) {
            err = 8;
            return false;
        }
        if (LeapYear(intYear) == true) {
            if (intday > 29) {
                err = 9;
                return false;
            }
        } else {
            if (intday > 28) {
                err = 10;
                return false;
            }
        }
    }
    return true;
}

// return true if a string contains only white characters
function isblank(s) {
    var i;
    for (i = 0; i < s.length; i++) {
        var c = s.charAt(i);
        if ((c != " ") && (c != "\n") && (c != "\t")) return false;
    }
    return true;
}

function verify(f) {
    var errors = "";
    var i;
    for (i = 0; i < f.length; i++) {
        var e = f.elements[i];
        if (e.getAttribute("type") == "radio" && !e.getAttribute("optional")) {
            if (ischecked(f, e.name) == false) {
                if (e.getAttribute("message") != null) alert(e.getAttribute("message"));
                else alert("At least one " + e.name + " must be checked ");
                e.focus();
                return false;
            }
        }
        // If it is hour object
        if ((e.getAttribute("ishour")) && !((e.value == null) || (e.value == "") || isblank(e.value))) {
            if (IsHour(e, ':') == false) {
                if (e.getAttribute("message") != null) alert(e.getAttribute("message"));
                else alert("Hour is invalid");
                e.focus();
                return false;
            }
        }
        // If it is email object
        if ((e.getAttribute("isemail")) && !((e.value == null) || (e.value == "") || isblank(e.value))) {
            if (isemail(e.value) == false) {
                if (e.getAttribute("message") != null) alert(e.getAttribute("message"));
                else alert("Email is invalid");
                e.focus();
                return false;
            }
        }

        // if it is Date object
        if ((e.getAttribute("isdate")) && !((e.value == null) || (e.value == "") || isblank(e.value))) {
            if (isdate(e.value) == false) {
                if (e.getAttribute("message") != null) alert(e.getAttribute("message"));
                else alert("Date is invalid");
                e.focus();
                return false;
            }
        }
        // if it is number object
        if ((e.getAttribute("isnumeric") || e.getAttribute("isdouble") || (e.getAttribute("min") != null) || (e.getAttribute("max") != null)) && !((e.value == null) || (e.value == "") || isblank(e.value))) {
            if (!_DECIMAL_DELIMITOR) decimal_delimitor = ",";
            else decimal_delimitor = _DECIMAL_DELIMITOR;
            test_value = replace(e.value, decimal_delimitor, "");
            if (e.getAttribute("isdouble"))
                is_number = isdouble(test_value);
            else
                is_number = isnum(test_value);

            var v = parseFloat(test_value);
            if (!is_number ||
                ((e.getAttribute("min") != null) && (v < e.getAttribute("min"))) ||
                ((e.getAttribute("max") != null) && (v > e.getAttribute("max")))) {
                errors += "- The field " + e.name + " must be a number";
                if (e.getAttribute("min") != null)
                    errors += " that is greater than " + e.getAttribute("min");
                if (e.getAttribute("min") != null && e.getAttribute("max") != null)
                    errors += " and less than " + e.getAttribute("max");
                else if (e.getAttribute("max") != null)
                    errors += " That is less than " + e.getAttribute("max");
                errors += ".\n";
                if (e.getAttribute("message") != null) alert(e.getAttribute("message"));
                else alert(errors);
                e.focus();
                return false;
            }
        }

        // check maxlength
        if ((e.getAttribute("maxlength") != null && e.getAttribute("maxlength") != "") && !((e.value == null) || (e.value == "") || isblank(e.value))) {
            if (e.value.length > e.getAttribute("maxlength")) {
                if (e.getAttribute("message") != null) alert(e.getAttribute("message"));
                else alert("The length of " + e.name + " must be less than " + e.getAttribute("maxlength"));
                e.focus();
                return false;
            }
        }

        // check multiple selectbox must be not empty
        if (e.getAttribute("checkempty") && e.getAttribute("type") == "select-multiple" && e.length == 0) {
            if (e.getAttribute("message") != null) alert(e.getAttribute("message"));
            else alert(e.name + " must be not empty");
            e.focus();
            return false;
        }

        // Check for text, textarea
        if (((e.getAttribute("type") == "password") || (e.getAttribute("type") == "text") || (e.getAttribute("type") == "textarea") || (e.getAttribute("type") == "select-one")) && e.getAttribute("optional") && e.getAttribute("optional") == "false") {
            if ((e.value == null) || (e.value == "") || isblank(e.value)) {
                if (e.getAttribute("message") != null) alert(e.getAttribute("message"));
                else alert(e.name + " must be not empty");
                if (e.getAttribute("type") != "select-one") {
                    e.focus();
                }
                return false;
            }
        }
    }

    return true;
}

//	Ham to_upper_case bien chu thuong thanh chu hoa
//	Khi goi : onchange="JavaScript:ToUpperKey(this)"
function to_upper_case(p_obj) {
    p_obj.value = p_obj.value.toUpperCase();
}
//	Ham to_lower_case bien chu hoa thanh chu thuong
//	Khi goi : onchange="JavaScript:ToLowerKey(this)"
function to_lower_case(p_obj) {
    p_obj.value = p_obj.value.toLowerCase();
}

function isurl(p_url) {
    if (p_url.indexOf("..") >= 0)
        return false;

    if (p_url.indexOf(" ") != -1)
        return false;
    else if (p_url.indexOf("http://") == -1)
        return false;
    else if (p_url == "http://")
        return false;
    else if (p_url.indexOf("http://") > 0)
        return false;

    p_url = p_url.substring(7, p_url.length);
    if (p_url.indexOf(".") == -1)
        return false;
    else if (p_url.indexOf(".") == 0)
        return false;
    else if (p_url.charAt(p_url.length - 1) == ".")
        return false;

    if (p_url.indexOf("/") != -1) {
        p_url = p_url.substring(0, p_url.indexOf("/"));
        if (p_url.charAt(p_url.length - 1) == ".")
            return false;
    }

    if (p_url.indexOf(":") != -1) {
        if (p_url.indexOf(":") == (p_url.length - 1))
            return false;
        else if (p_url.charAt(p_url.indexOf(":") + 1) == ".")
            return false;
        p_url = p_url.substring(0, p_url.indexOf(":"));
        if (p_url.charAt(p_url.length - 1) == ".")
            return false;
    }

    return true;
}

// Ham tu dong check vao cac o check box neu trang thai cua dong duoc thay doi
function chk_status_index_onclick(p_object) {
    var v_index = replace(p_object.name, "chk_status_index", "") * 1;
    var p_obj_chk = eval("document.frm_dsp_all_item.chk_item_id" + v_index);
    if (p_obj_chk) {
        p_obj_chk.checked = true;
    }
}

function replace(string, text, by) {
    return string.replace(text, by);
}

function change_focus(f, o) {
    var ret1 = "";
    var j = 0;
    var i = 0;
    var b = 0;
    first_object_id = -1;
    //try{        
    keyCode = event.keyCode ? event.keyCode : event.charCode;
    if (keyCode == 13 && o.type != "button") {
        if (event.keyCode) {
            event.keyCode = 9;
        } else {
            event.charCode = 9;
        }
    }
    keyCode = event.keyCode ? event.keyCode : event.charCode;
    // Neu la phim Enter, Down, Up
    if ((o.type != 'select-one' && (keyCode == '40' || keyCode == '38' || keyCode == '13'))) {
        b = 0;
        while (i >= 0 && (i < f.length) && (j < 2)) {
            var e = f.elements[i];
            // Xac dinh ID cua field dau tien co kieu khong phai la hidden
            if (e.type != 'hidden' && first_object_id == -1) first_object_id = i;
            // Tim de vi tri cua doi tuong hien tai
            if ((b == 0) && (e.name == o.name) && (e.type != 'hidden')) {
                o.blur();
                b = 1;
                if (keyCode != '38') {
                    i = i + 1;
                    if (i == f.length) i = first_object_id;
                } else {
                    if (i == first_object_id) i = f.length - 1;
                    else i = i - 1;
                }
                var e = f.elements[i];
            }
            if (b == 1) {
                if ((e.type != 'hidden') && (!e.readOnly) && (!e.disabled) && (e.hide != 'true')) {
                    e.focus();
                    return true;
                }
            }
            if (keyCode != '38') {
                i = i + 1;
                if (i == f.length) {
                    i = 0;
                    j = j + 1;
                }
            } else {
                i = i - 1;
                if (i == first_object_id) {
                    i = f.length - 1;
                    j = j + 1;
                }
            }
        }
    }
    return true;
    //}catch(e){}
}

function AjaxAction(where, url) {
    var xmlHttp = new GetXmlHttpObject()
    if (xmlHttp == null) {
        return;
    }
    var bar = '&#272;ang t&#7843;i d&#7919; li&#7879;u';
    document.getElementById(where).innerHTML = bar
    xmlHttp.onreadystatechange = function () {
        if (xmlHttp.readyState == 4 || xmlHttp.readyState == 200) {
            document.getElementById(where).innerHTML = xmlHttp.responseText;
            ocm_chay_javascript_tu_ket_qua_ajax(xmlHttp.responseText);
        }
    }
    xmlHttp.open("GET", url, true);
    xmlHttp.send(null);
}

function GetXmlHttpObject() {
    var objXMLHttp = null;
    if (window.XMLHttpRequest) {
        objXMLHttp = new XMLHttpRequest();
    } else if (window.ActiveXObject) {
        objXMLHttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    return objXMLHttp;
}


function close_box_popup() {
    $('#_box_overlay').hide();
}

function show_box_popup(v_html, width_box, height_box) {
    if (!width_box) width_box = 320;
    if (!height_box) height_box = 300;

    //Opera Netscape 6 Netscape 4x Mozilla
    if (window.innerWidth || window.innerHeight) {
        docwidth = window.innerWidth;
        docheight = window.innerHeight;
    }
    //IE Mozilla
    if (document.body.clientWidth || document.body.clientHeight) {
        docwidth = document.body.clientWidth;
        docheight = document.body.clientHeight;
    }
    v_top = (f_clientHeight() - height_box) / 2;
    v_left = (docwidth - width_box) / 2;

    if (document.getElementById('_box_popup')) {
        $("#_box_popup").css({
            left: v_left,
            top: v_top,
            width: width_box,
            height: height_box
        });
    } else {
        var v_popup_overlay = '<div class="popup-overlay boxy-modal" id="_box_overlay"><div class="box-popup" id="_box_popup" style="left:' + v_left + 'px;top:' + v_top + 'px;width:' + width_box + 'px;height:' + height_box + 'px;overflow:auto"></div></div>';
        $("body").append(v_popup_overlay);
    }
    $("#_box_popup").html(v_html);
    $('#_box_overlay').show();
    // add key press event
    $("body").keypress(function (e) {
        if (e.keyCode == 27) { //Esc keycode
            close_box_popup();
        }
    });
}

function f_clientWidth() {
    return f_filterResults(
        window.innerWidth ? window.innerWidth : 0,
        document.documentElement ? document.documentElement.clientWidth : 0,
        document.body ? document.body.clientWidth : 0
    );
}

function f_clientHeight() {
    return f_filterResults(
        window.innerHeight ? window.innerHeight : 0,
        document.documentElement ? document.documentElement.clientHeight : 0,
        document.body ? document.body.clientHeight : 0
    );
}

function isIE() {
    if (navigator.appName == 'Microsoft Internet Explorer') {
        return true;
    }
    return false;
}

function isIE6() {
    if (!window.XMLHttpRequest) {
        return true;
    }
    return false;
}

function f_filterResults(n_win, n_docel, n_body) {
    var n_result = n_win ? n_win : 0;
    if (n_docel && (!n_result || (n_result > n_docel)))
        n_result = n_docel;
    return n_body && (!n_result || (n_result > n_body)) ? n_body : n_result;
}


function disableEnterKey(e) {
    var key;

    if (window.event) {
        key = window.event.keyCode; //IE
    } else {
        key = e.which; //firefox
    }

    if (key == 13) {
        return false;
    } else {
        return true;
    }
}

function checkToDisplay(p_check_obj, p_target_id) {
    objTarget = window.document.getElementById(p_target_id);
    if (p_check_obj.checked) {
        objTarget.style.display = '';
    } else {
        objTarget.style.display = 'none';
    }
}

function hiddenAllElementById(p_obj_prefix, p_length) {
    for (i = 0; i < p_length; i++) {
        v_obj = document.getElementById(p_obj_prefix + i);
        if (v_obj) {
            v_obj.style.display = 'none';
        }
    }
}

function removeBlockById(p_obj_id) {
    v_obj = document.getElementById(p_obj_id);
    if (v_obj) {
        v_obj.innerHTML = '';
        v_obj.style.display = 'none';
    }
}

function getAllSelectOption(p_obj_id, p_display_all) {
    objSelectList = window.document.getElementById(p_obj_id);
    obj_data = p_display_all ? new Object() : new Array();
    for (var i = 0; i < objSelectList.options.length; i++) {
        if (p_display_all == true) {
            obj_data[objSelectList.options[i].value] = encodeURIComponent(objSelectList.options[i].text.replace(/"/g, ''));
        } else {
            obj_data[obj_data.length] = encodeURIComponent(objSelectList.options[i].value.replace(/"/g, ''));
        }
    }
    str_data = JSON.stringify(obj_data);
    return str_data;
}

function resetSelectList(p_select_list_id) {
    var objSelectList = window.document.getElementById(p_select_list_id);
    if (!objSelectList) {
        return false;
    }
    objSelectList.length = 0;

    var change_data = window.document.getElementById('change_data');
    if (change_data) {
        change_data.value = 1;
    }
}

function putElementToSelectList(elementText, elementValue, p_select_list_id) {
    var objSelectList = window.document.getElementById(p_select_list_id);
    if (!objSelectList) {
        return false;
    }
    var len = objSelectList.length;
    objSelectList.options[len] = new Option(elementText, elementValue, false, true);
    v_title = locdau(elementText);
    objSelectList.options[len].setAttribute('title', elementText + ' ' + v_title);
}

function openerResetSelectList(p_select_list_id) {
    window.opener.resetSelectList(p_select_list_id);
}

function openerPutElementToSelectList(elementText, elementValue, p_select_list_id) {
    window.opener.putElementToSelectList(elementText, elementValue, p_select_list_id);
}

function copyOptionFromSelectListToOther(p_source_id, p_desc_id) {
    resetSelectList(p_desc_id);
    $options = $("#" + p_source_id + " > option").clone();
    $('#' + p_desc_id).append($options);
}


function getRadioButtonValue(radioObj) {
    if (!radioObj) {
        return "";
    }
    var radioLength = radioObj.length;
    if (radioLength == undefined) {
        if (radioObj.checked) {
            return radioObj.value;
        } else {
            return "";
        }
    }
    for (var i = 0; i < radioLength; i++) {
        if (radioObj[i].checked) {
            return radioObj[i].value;
        }
    }
    return "";
}

function getRadioButton(radioObj) {
    if (!radioObj) {
        return "";
    }
    var radioLength = radioObj.length;
    if (radioLength == undefined) {
        if (radioObj.checked) {
            return radioObj;
        } else {
            return "";
        }
    }
    for (var i = 0; i < radioLength; i++) {
        if (radioObj[i].checked) {
            return radioObj[i];
        }
    }
    return "";
}

function objSelectAll(p_obj) {
    for (var i = 0; i < p_obj.options.length; i++) {
        p_obj.options[i].selected = true;
    }
}


// Function for CKeditor
function orderEditorContent(p_editor, p_order) {
    v_selection_content = p_editor.getSelection().getSelectedText();
    if (v_selection_content == '') {
        return false;
    }
    v_content = p_editor.getData();
    matches = v_content.match(/<p[^>]*>(<[^p]+[^>]*>)[^<]*(<\/[^p]+>)?<\/p>/g);
    v_arr = new Array();
    if (matches != null && matches.length > 0) {
        for (i = 0; i < matches.length; i++) {
            if (matches[i] == '') {
                continue;
            }
            if (matches[i].match(v_selection_content)) {
                if (p_order == 'delete') {
                    continue;
                } else if (p_order == 'up') {
                    if (i > 0) {
                        v_arr[i] = v_arr[i - 1];
                        v_arr[i - 1] = matches[i];
                        continue;
                    }
                } else if (p_order == 'down') {
                    if (i < matches.length - 1) {
                        v_arr[i] = matches[i + 1];
                        v_arr[i + 1] = matches[i];
                        i++;
                        continue;
                    }
                }
            }
            v_arr[v_arr.length] = matches[i];
        }
    } else {
        return false;
    }
    v_new_content = v_arr.join('');
    p_editor.setData(v_new_content);
}

function displayFileUploadInfo(o, p_target_id) {
    var nFiles = o.length;
    var str = '';
    for (var i = 0; i < nFiles; i++) {
        str += '<div class="line-dot">';
        str += '<div style="width:400px">File <b>' + o[i]['name'] + '</b>: ' + (Math.round(o[i]['size'] / 1024 * 100) / 100) + 'KB</div>';
        str += '</div>';
    }
    document.getElementById(p_target_id).innerHTML = str;
}

/*
 * Cai dat autocomplete cho 1 input
 * params
 *      p_input_id : id cua input
 *      p_json_data : du lieu tim kiem kieu json (vi du: [{"id":"1","name":"Tieng Viet co dau","ascii_name":"Tieng Viet khogn dau"})
 *      p_target_id : id cua input can gan du lieu
 *      p_min_char : so ky tu toi thieu can nhap de autocomplete
 *      p_callback : function can goi sau khi chon doi tuong tim kiem
 * vi du: setAutoComplete('txt_search', p_json_data, 'hdn_search_id', 1, 'abc()')
 */
function setAutoComplete(p_input_id, p_json_data, p_target_id, p_min_char, p_callback) {
    $(document).ready(function () {
        //attach autocomplete
        v_split_char = '#';
        $("#" + p_input_id).autocomplete({
            source: $.map($.makeArray(p_json_data), function (val) {
                return {
                    value: val.name + v_split_char + val.ascii_name,
                    id: val.id,
                    name: val.name
                };
            }),
            minLength: (p_min_char > 0) ? p_min_char : 1,
            delay: 20,

            focus: function (event, ui) {
                return false;
            },
            //define select handler
            select: function (e, ui) {
                v_name = ui.item.name.split(v_split_char);
                v_name = v_name[0];
                $("#" + p_input_id).val(v_name);
                if (p_target_id != '') {
                    $("#" + p_target_id).val(ui.item.id);
                }
                if (p_callback != null && p_callback != '') {
                    eval(p_callback);
                }
                return false;
            },
            //define select handler
            change: function () {
                // do nothing
            }
        })
            .data("autocomplete")._renderItem = function (ul, item) {
                re = new RegExp(this.term, "i");
                t = item.name.replace(re, "<span class='ui-autocomplete-match'>$&</span>");
                return $("<li></li>")
                    .data("item.autocomplete", item)
                    .append("<a>" + t + "</a>")
                    .appendTo(ul);
            };
    });
};

function disableInputAutoComplete(p_input_id, p_target_id, p_status) {
    v_obj = document.getElementById(p_input_id);
    v_obj.readOnly = p_status;
    // Nhap lai input
    if (!p_status) {
        v_obj.value = '';
        document.getElementById(p_target_id).value = '';
    }
}

function setCountdown(p_input_id, p_max_length, p_target_id) {
    $(document).ready(function () {
        currentLength = $('#' + p_input_id).val().length;
        left = p_max_length - currentLength;
        v_countdown = 'Đã nhập <span style="color:red;fontweight:bold">' + currentLength + '</span>';
        v_countdown += ' còn <span style="color:red;fontweight:bold">' + left + '</span>';
        $('#' + p_target_id).html(v_countdown);
        $('#' + p_input_id).keyup(function () {
            currentLength = $(this).val().length;
            left = p_max_length - currentLength;
            if (left < 0) {
                left = 0;
                currentLength = p_max_length;
                $(this).val($(this).val().substring(0, p_max_length));
            }
            v_countdown = 'Đã nhập <span style="color:red;fontweight:bold">' + currentLength + '</span>';
            v_countdown += ' còn <span style="color:red;fontweight:bold">' + left + '</span>';
            $('#' + p_target_id).html(v_countdown);
        });
    });
}

/*
 * Ham thuc hien dem nguoc so tu khoa nhap vao o textbox
 * params
 *      p_input_id : id cua input
 *      p_max_length : gioi han so tu duoc phep nhap
 *      p_target_id : id cua input can gan du lieu
 *      p_delimiter : so ky tu phan tach cac tu
 * vi du: setCountWordDown('txt_keyword', 5, 'txt_keyword_countdown', ',')
 */
function setCountWordDown(p_input_id, p_max_length, p_target_id, p_delimiter) {
    $(document).ready(function () {
        var v_content = $('#' + p_input_id).val();
        // mang chua cac tu
        var v_word_array = v_content.split(p_delimiter);
        // dem so tu da nhap
        var v_current_length = v_word_array.length - 1;
        // kiem tra gioi han tu da nhap
        var v_sub_length = p_max_length * 1 - v_current_length * 1;
        if (v_sub_length <= 0) {
            v_content_limit = '';
            for (i = 0; i < p_max_length * 1; i++) {
                v_content_limit += (i == 0) ? v_word_array[i] : "," + v_word_array[i];
            }
            $('#' + p_input_id).val(v_content_limit);
            v_sub_length = 0;
        }

        v_countdown = 'Đã nhập <span style="color:red;fontweight:bold">' + v_current_length + '</span>';
        v_countdown += ' từ còn <span style="color:red;fontweight:bold">' + v_sub_length + '</span> từ.';
        $('#' + p_target_id).html(v_countdown);
        // xu ly khi nhap noi dung vao control
        $('#' + p_input_id).keyup(function () {
            v_current_content = $(this).val();
            v_word_array = v_current_content.split(p_delimiter);
            v_current_length = v_word_array.length - 1;
            v_sub_length = p_max_length * 1 - v_current_length * 1;
            if (v_sub_length <= 0) {
                v_sub_length = 0;
                v_current_length = p_max_length;
                v_content_limit = '';
                for (i = 0; i < p_max_length * 1; i++) {
                    v_content_limit += (i == 0) ? v_word_array[i] : "," + v_word_array[i];
                }
                $(this).val(v_content_limit);
            }
            v_countdown = 'Đã nhập <span style="color:red;fontweight:bold">' + v_current_length + '</span>';
            v_countdown += ' từ còn <span style="color:red;fontweight:bold">' + v_sub_length + '</span> từ.';
            $('#' + p_target_id).html(v_countdown);
        });

    });
}

function getImageDataURL(obj, target_id, p_callback) {
    if (window.FileReader) {
        files = obj.files; // FileList object

        f = files[0];
        // Only process image files.
        if (!f.type.match('image.*')) {
            return false;
        }

        reader = new FileReader();

        // Closure to capture the file information.
        reader.onload = (function (theFile) {
            return function (e) {
                document.getElementById(target_id).value = e.target.result;
            };
        })(f);

        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    } else {
        document.getElementById(target_id).value = obj.value;
    }
    if (p_callback != null && p_callback != '') {
        p_callback();
    }
}

// Ham loc truong theo ten + ma
function chon_nhanh(p_text_input, p_sel_arr, event) {
    if (typeof searching == undefined) var searching = null;
    if (null != searching) clearTimeout(searching);
    if (event.keyCode == 13) {
        p_text_input.form.submit();
    }
    p_text_input.autocomplete = 'off';
    searching = setTimeout(function () {
        searchNow(p_text_input, p_sel_arr)
    }, 100);
}

// ham tim kiem tren mang
function searchNow(p_text_input, p_sel_arr) {
    if (typeof searching == undefined) var searching = null;
    if (null != searching) clearTimeout(searching);
    var input = locdau(p_text_input.value).toUpperCase();
    var selectList = p_sel_arr;
    var selectOptions = selectList.getElementsByTagName('option');
    if (p_text_input.value == '') {
        selectOptions[0].selected = true;
        return;
    }
    var found;
    var hid_value;
    found = false;
    var foundCount;
    foundCount = 0;
    var opt;
    for (var i = 0; i < selectOptions.length; i++) {
        opt = selectOptions[i];
        var obj = locdau(opt.title).toUpperCase();
        if (obj.indexOf(input) >= 0) {
            if (!found) {
                /* Bỏ comment nếu muốn option được chọn nhảy lên trên cùng
                if(i>0){
                    selectList.removeChild(opt);
                    selectList.insertBefore(opt,selectOptions[0]);
                }
                */
                opt.selected = true;
                found = true;
            } else {
                /* Bỏ comment nếu muốn option được chọn nhảy lên trên cùng
                selectList.removeChild(opt);
                if(selectOptions[foundCount]){
                    selectList.insertBefore(opt,selectOptions[foundCount]);
                }else{
                    selectList.insertBefore(opt,selectOptions[foundCount-1]);
                }
                */
            }
            foundCount++;
        } else {
            opt.selected = false;
        }
    }
    if (!found) {
        selectOptions[0].selected = true;
    }
}

function changeValueBySelect(p_obj, p_target_id) {
    v_idx = p_obj.selectedIndex;
    v_target = document.getElementById(p_target_id);
    for (i = 0; i < v_target.options.length; i++) {
        if (v_target.options[i].value == p_obj.options[v_idx].value) {
            v_target.options[i].selected = true;
            break;
        }
    }
}

function flashWrite(p_url, p_width, p_height) {
    base_url = CONFIG.BASE_URL + '/js/';
    p_url = p_url.substring(p_url.indexOf('file=') + 5);
    p_url = p_url.replace('&', '');
    p_url = p_url.replace(' ', '');
    urlArr = p_url.split(',');
    arr_playlist = new Array();
    for (i = 0; i < urlArr.length; i++) {
        arr_playlist[i] = '{file:"' + urlArr[i] + '?start=0"';
        if (i == 0) {
            arr_playlist[i] += ', image:"' + base_url + 'jwplayer/preview.swf"';
        }
        arr_playlist[i] += '}';
    }
    v_playlist = '[' + arr_playlist.join() + ']';

    playerID = 'mediaplayer' + Math.random();
    v_str_player = '<div id="' + playerID + '"></div>';
    v_str_player += '<scr' + 'ipt type="text/javascript">';
    v_str_player += 'jwplayer("' + playerID + '").setup({';
    v_str_player += 'flashplayer: "' + base_url + 'jwplayer/player.swf",';
    v_str_player += 'playlist: ' + v_playlist + ',';
    v_str_player += 'repeat: "list",';
    v_str_player += 'stretching: "uniform",';
    v_str_player += 'width: 528,';
    v_str_player += 'height: 335,'; // 297
    v_str_player += 'skin: "' + base_url + 'jwplayer/skin-1.swf",';
    v_str_player += '"controlbar.idlehide":"true","controlbar.position":"bottom"';
    v_str_player += '})';
    v_str_player += '</scr' + 'ipt>';
    document.write(v_str_player);
}

//Ham chuyen chu co dau sang khong dau
function locdau(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

// Chuyen trang neu la trinh duyet IE
function switch_page_by_ie(p_page) {
    if (isIE()) {
        window.location.href = p_page;
    }
}

function deleteFile(divID) {
    document.getElementById(divID).innerHTML = '';
    document.getElementById(divID).style.display = 'none';
}

function addFile(contentDiv, inputName, num) {
    var uploadContent = document.getElementById(contentDiv);
    for (var i = 1; i <= num; i++) {
        fileNumber++;
        var fileUpload = document.createElement('div');
        fileUpload.innerHTML = '<div id="file' + fileNumber + '"><div style="float:left;width:50px;">File ' + fileNumber + ': </div><div><input type="file" name="' + inputName + '[]" style="width:215px" /> <a href="javascript:void(0);" onclick="deleteFile(\'file' + fileNumber + '\')">[Xoá]</a></div></div>';
        uploadContent.appendChild(fileUpload);
    }
}

function display_preview_image(p_image_dsp, p_total_image, p_image_block_id, p_thumb_id) {
    p_image_dsp = (p_image_dsp > p_total_image - 1) ? p_total_image - 1 : p_image_dsp;
    p_image_dsp = (p_image_dsp < 0) ? 0 : p_image_dsp;
    for (i = 0; i < p_total_image; i++) {
        if (p_image_dsp == i) {
            document.getElementById(p_image_block_id + i).style.display = '';
            document.getElementById(p_thumb_id + i).style.border = '1px solid red';
        } else {
            document.getElementById(p_image_block_id + i).style.display = 'none';
            document.getElementById(p_thumb_id + i).style.border = '0px';
        }
    }
}

function loadAjaxFromInput(p_input_id, p_link, p_target) {
    v_input_obj = document.getElementById(p_input_id);
    if (v_input_obj.value != '') {
        AjaxAction(p_target, p_link + v_input_obj.value);
    }
}


// Kiem tra du lieu da duoc luu truoc khi chuyen trang khac
function check_unsaved_change(p_check_id, p_arr_fckeditor_id) {
    $(document).ready(function () {
        $("input").change(function () {
            $("#" + p_check_id).val("1");
        });
        $("select").change(function () {
            $("#" + p_check_id).val("1");
        });
        $("textarea").change(function () {
            $("#" + p_check_id).val("1");
        });
        $("input:checkbox").click(function () {
            $("#" + p_check_id).val("1");
        });
        $("input:radio").click(function () {
            $("#" + p_check_id).val("1");
        });
        window.onbeforeunload = function (e) {
            for (i in p_arr_fckeditor_id) {
                // FCKeditor
                /*
                if (FCKeditorAPI.GetInstance(p_arr_fckeditor_id[i]).IsDirty()
                        && FCKeditorAPI.GetInstance(p_arr_fckeditor_id[i]).GetData()!=''
                        && $("#"+p_check_id).val()!=-1) {
                    $("#"+p_check_id).val("1");
                    break;
                }
                */
                // CKEDITOR
                if (CKEDITOR.instances[p_arr_fckeditor_id[i]].checkDirty() && $("#" + p_check_id).val() != -1) {
                    $("#" + p_check_id).val("1");
                    break;
                }
            }
            if ($("#" + p_check_id).val() == "1") {
                msg = 'Dữ liệu chưa được lưu.\nBạn có chắc chắn muốn chuyển trang khác?';
                if (/Firefox[\/\s](\d+)/.test(navigator.userAgent) && new Number(RegExp.$1) >= 4) {
                    if (confirm(msg)) {
                        history.go();
                    } else {
                        window.setTimeout(function () {
                            window.stop();
                        }, 1);
                    }
                } else {
                    return msg;
                }
            }
        }
    });
}

function setDatePicker(p_object_class) {
    $(document).ready(function () {
        $(function () {
            $("." + p_object_class).datepicker({
                changeMonth: true,
                changeYear: true
            });
        });
    });
}

function btn_update_onclick(p_forms, p_action_url, p_target, p_confirm_message, p_class_button) {
    v_class_button = (typeof (p_class_button) === 'undefined') ? '' : p_class_button;
    v_is_ok = false;
    if (list_check_has_checked(p_forms, 'chk_item_id')) {
        if (confirm(p_confirm_message)) {
            frm_submit(p_forms, p_action_url, p_target);
            v_is_ok = true;
        }
    } else {
        alert('Chưa có đối tượng nào được chọn!');
    }
    if (!v_is_ok && v_class_button != '') {
        set_enable_link(v_class_button);
    }
}
/*
    Ham chuyen sang man hinh cap nhat
*/
function btn_add_onclick(p_forms, p_action_url, p_target) {
    frm_submit(p_forms, p_action_url, p_target);
}

/*
    Ham quay lai man hinh danh sach
*/
function btn_back_onclick(p_forms, p_action_url, p_target) {
    frm_submit(p_forms, p_action_url, p_target);
}

/**
 * Check or un check cac checkbox hiện thị
 * ocm_check_all('selectall', 'case'); id=selectall, class=case
 * @example http://viralpatel.net/blogs/multiple-checkbox-select-deselect-jquery-tutorial-example/
 * @params string p_checkbox_id id của checkbox khi bấm để chọn tất cả
 * @params string p_checkbox_class tên class các checkbox khi bấm vào id p_checkbox_id cần chọn tất
 * @return
 */
function ocm_check_all(p_checkbox_id, p_checkbox_class) {
    $(function () {
        // add multiple select / deselect functionality
        $("#" + p_checkbox_id).click(function () {
            $('.' + p_checkbox_class).attr('checked', this.checked);
        });

        // if all checkbox are selected, check the selectall checkbox
        // and viceversa
        $('.' + p_checkbox_class).click(function () {

            if ($('.' + p_checkbox_class).length == $("." + p_checkbox_class + ":checked").length) {
                $("#" + p_checkbox_id).attr("checked", "checked");
            } else {
                $("#" + p_checkbox_id).removeAttr("checked");
            }
        });
    });
}

/*
 * Ham tra lai gia tri danh sach duoc chon khi click chọn
 * @author  cuongnx
 * @param  string p_checkbox_id ID control checkbox
 * @param  string p_tong_so_phan_tu Tong so phan tu cua checkbox
 * @return string
 */
function chon_va_bo_chon_tat_ca_checkbox_co_id_tu_tang(p_checkbox_id, p_tong_so_phan_tu) {
    for (i = 0; i < p_tong_so_phan_tu; i++) {
        if (document.getElementById(p_checkbox_id + '[' + i + ']')) {
            if (v_check != false && v_check != true) {
                if (document.getElementById(p_checkbox_id + '[' + i + ']').checked == true) {
                    var v_check = false;
                } else {
                    var v_check = true;
                }
            }
            document.getElementById(p_checkbox_id + '[' + i + ']').checked = v_check;
        }
    }
}
/*
 * Ham chon check box sau khi AutoComplete
 * @author  ducnq - 04/10/2012
 * @param  checkbox_id id chung cua danh sach checkbox
 * @param  hdn_id id hdn luu gia tri truoc do
 * @param  hdn_id id cua hidden luu gia tri truoc do
 * @param  hdn_tong id cua hidden luu tong so doi tuong
 * @param  txt_input id cua textbox tim nhanh
 * @param  is_submit co submit form hay khong
 * @param  form_id Nhap ten form neu is_submit = 1 (tuc la co submit)
 * @param  p_attr_sub Thuoc tinh cua checkbox
 * @return  string
 */
function chon_checkbox_sau_khi_auto_complete(checkbox_id, hdn_id, hdn_tong, txt_input, is_submit, form_id, p_attr_sub) {
    v_attr_sub = (typeof (p_attr_sub) === 'undefined') ? '' : p_attr_sub;
    var id_duoc_chon = document.getElementById(hdn_id).value;
    var i = 0;
    var so_tinh = document.getElementById(hdn_tong).value;
    for (i = 0; i < so_tinh; i++) {
        var p_check_obj = document.getElementById(checkbox_id + '[' + i + ']');
        if (p_check_obj.value == id_duoc_chon) {
            p_check_obj.checked = true;
            p_check_obj.focus();
            document.getElementById(txt_input).value = '';
            document.getElementById(txt_input).focus();
            if (v_attr_sub != '') {
                chon_chuyen_muc_cap_2(p_check_obj, v_attr_sub); // goi ham tu dong check chuyen muc cap 2
            }
            if (is_submit == 1) {
                eval("document." + form_id + ".submit()");
            }
        }
    }
    return false;
}

/*
 * Ham thuc hien load lai trang khi thay doi gia tri control loc tim
 * @param : frm_name:ten form can load lai
 * @return submit
 */
function autosubmit_when_control_changed(p_obj, frm_name) {
    $(document).ready(function () {
        $("[" + p_obj + "]").on({
            change: function (event) {
                var frm = eval('document.' + frm_name);
                frm.submit();
            },
            keypress: function (event) {
                if (event.which == 13) {
                    var frm = eval('document.' + frm_name);
                    frm.submit();
                }
            }
        })
    });
}
/*
 * Ham tra lai gia tri danh sach duoc chon khi click chọn
 * @author  cuongnx
 * @param  string p_checkbox_id ID control checkbox
 * @param  string p_tong_so_phan_tu Tong so phan tu cua checkbox
 * @return string
 */
function chon_va_bo_chon_tat_ca_checkbox(p_checkbox_id, p_tong_so_phan_tu, p_checked) {
    for (i = 0; i < p_tong_so_phan_tu; i++) {
        if (document.getElementById(p_checkbox_id + '[' + i + ']')) {
            document.getElementById(p_checkbox_id + '[' + i + ']').checked = p_checked;
        }
    }
}

/*
 * Ham thuc hien submit khi thay doi so ban ghi hien thi tren/trang man hinh danh sach menu ngang
 * @author  phuonghv
 */
function page_number_onchange(frm_name) {
    //unchecked all = chon tat ca
    if (document.getElementById('tong_so_chuyen_muc')) {
        v_total_cat = document.getElementById('tong_so_chuyen_muc').value;
        chon_va_bo_chon_tat_ca_checkbox('checkbox_cat', v_total_cat, false);
    }
    if (document.getElementById('tong_so_user')) {
        v_total_user = document.getElementById('tong_so_user').value;
        chon_va_bo_chon_tat_ca_checkbox('checkbox_user', v_total_user, false);
    }
    if (document.getElementById('tong_so_status')) {
        v_total_status = document.getElementById('tong_so_status').value;
        chon_va_bo_chon_tat_ca_checkbox('checkbox_status', v_total_status, false);
    }
    var frm = eval('document.' + frm_name);
    frm.submit();
}
/**
 * Thuc hien chay javascript doi voi cac ket qua tu ajax
 * Author: Cuongnx
 * @param string html_ajax HTML tra ve tu ajax
 */
function ocm_chay_javascript_tu_ket_qua_ajax(html_ajax) {
    var scripts = new Array(); // Tao mang chua ma script

    // Lay ma script
    while (html_ajax.indexOf("<script") > -1 || html_ajax.indexOf("</script") > -1) {
        var s = html_ajax.indexOf("<script");
        var s_e = html_ajax.indexOf(">", s);
        var e = html_ajax.indexOf("</script", s);
        var e_e = html_ajax.indexOf(">", e);

        // Them script vao mang
        scripts.push(html_ajax.substring(s_e + 1, e));
        // Tach script ra html_ajax
        html_ajax = html_ajax.substring(0, s) + html_ajax.substring(e_e + 1);
    }

    // Thuc hien eval doi voi tung script trong mang
    for (var i = 0; i < scripts.length; i++) {
        try {
            eval(scripts[i]);
        } catch (ex) {

        }
    }
}
/*
 * Ham dung de goi ham tim kiem nhanh tren select box
 * @author  ducnq
 * @param  p_text_input : id cua textbox nhap chuoi kim kiem
 * @param  p_sel_arr : id cua select box can tim kiem
 * @param  event : bat su kien go phim
 */
var searching = null;

function goi_ham_tim_kiem_select_box(p_text_input, p_sel_arr, event) {
    alert('ádasb');
    if (null != searching) clearTimeout(searching);
    if (event.keyCode == 13) {
        return;
    }
    document.getElementById(p_text_input).autocomplete = 'off';
    searching = setTimeout("tim_kiem_tren_select_box('" + p_text_input + "','" + p_sel_arr + "')", 100);
}
/*
 * Ham tim kiem tren mang gia tri cua select box
 * @author  ducnq
 * @param  p_text_input : id cua textbox nhap chuoi kim kiem
 * @param  p_sel_arr : id cua select box can tim kiem
 */
function tim_kiem_tren_select_box(p_text_input, p_sel_arr) {
    if (null != searching) clearTimeout(searching);
    var input = ocm_to_khong_dau(document.getElementById(p_text_input).value).toUpperCase();
    var selectList = document.getElementById(p_sel_arr);
    var selectOptions = selectList.getElementsByTagName('option');
    if (document.getElementById(p_text_input).value == '') {
        selectOptions[0].selected = true;
        return;
    }
    var found;
    found = false;
    var foundCount;
    foundCount = 0;
    var opt;
    // tim kiem trong tung option cua selectbox
    for (var i = 0; i < selectOptions.length; i++) {
        opt = selectOptions[i];
        var obj = ocm_to_khong_dau(opt.title).toUpperCase();
        if (obj.indexOf(input) >= 0) {
            if (!found) {
                if (i > 0) {
                    selectList.removeChild(opt);
                    selectList.insertBefore(opt, selectOptions[0]);
                }
                opt.selected = true;
                found = true;
            } else {
                selectList.removeChild(opt);
                if (selectOptions[foundCount]) {
                    selectList.insertBefore(opt, selectOptions[foundCount]);
                } else {
                    selectList.insertBefore(opt, selectOptions[foundCount - 1]);
                }
            }
            foundCount++;
        } else {
            opt.selected = false;
        }
    }
    if (!found) {
        if (selectOptions[0]) {
            selectOptions[0].selected = true;
        }
    }
}
/**
 * Ham chuyen chu co dau sang khong dau
 * @param string str chuoi co dau can chuyen thanh ko dau
 * @return string
 */
function ocm_to_khong_dau(str) {
    str = str.toLowerCase();
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    return str;
}

/*
 * Ham chon check box sau khi AutoComplete
 * @author  phuonghv - 12/01/2013
 * @param  checkbox_id id chung cua danh sach checkbox
 * @param  hdn_id id hdn luu gia tri truoc do
 * @param  hdn_id id cua hidden luu gia tri truoc do
 * @param  hdn_tong id cua hidden luu tong so doi tuong
 * @param  txt_input id cua textbox tim nhanh
 * @param  is_submit co submit form hay khong
 * @param  form_id Nhap ten form neu is_submit = 1 (tuc la co submit)
 * @return  string 
 */

function chon_radiobuton_sau_khi_auto_complete(radio_id, hdn_id, hdn_tong, txt_input, is_submit, form_id) {
    var v_selected_value = document.getElementById(hdn_id).value;
    var i = 0;
    var v_count = document.getElementById(hdn_tong).value;
    for (i = 0; i < v_count; i++) {
        if (document.getElementById(radio_id + i).value == v_selected_value) {
            document.getElementById(radio_id + i).checked = true;
            document.getElementById(radio_id + i).focus();
            document.getElementById(txt_input).value = '';
            document.getElementById(txt_input).focus();
            if (is_submit == 1) {
                eval("document." + form_id + ".submit()");
            }
            break;
        }
    }
    return false;
}
/*
 * Ham chon/bo chon radio button group
 * @author  phuonghv - 12/01/2013
 * @param  p_radio_id id chung cua danh sach radio button group
 * @param  p_tong_so_phan_tu tong so radio button
 * @param  p_check  gia tri true/false
 * @param  is_submit co submit form hay khong
 * @param  form_id Nhap ten form neu is_submit = 1 (tuc la co submit)
 * @return  string
 */
function chon_hoac_bo_chon_tat_ca_radio_button(p_radio_id, p_tong_so_phan_tu, p_check, p_is_submit, form_id) {
    for (i = 0; i < p_tong_so_phan_tu; i++) {
        if (document.getElementById(p_radio_id + i)) {
            document.getElementById(p_radio_id + i).checked = p_check;
        }
    }
    if (p_is_submit == 1) {
        eval("document." + form_id + ".submit()");
    }
    return false;
}
/*
 * Chuyển chuỗi kí tự (string) sang đối tượng Date()
 * @author  phuonghv - 12/01/2013
 * @param  form_id Nhap ten form
 */
function parseDate(str) {
    var mdy = str.split('-');
    return new Date(mdy[2], mdy[1] - 1, mdy[0]);
}

/**
 * Format date as a string
 * @param date - a date object (usually "new Date();")
 * @param format - a string format, eg. "DD-MM-YYYY"
 */
function dateFormat(date, format) {
    // Calculate date parts and replace instances in format string accordingly
    format = format.replace("DD", (date.getDate() < 10 ? '0' : '') + date.getDate()); // Pad with '0' if needed
    format = format.replace("MM", (date.getMonth() + 1 < 9 ? '0' : '') + (date.getMonth() + 1)); // Months are zero-based
    format = format.replace("YYYY", date.getFullYear());
    return format;
}

function getEndDateByWeek(p_input_id, p_start_date_obj_id, p_end_date_obj_id) {
    obj_input_date = $('#' + p_input_id);
    number_week = parseInt(obj_input_date.val());
    if (number_week > 0) {
        obj_start_date = $('#' + p_start_date_obj_id);
        v_start_date = obj_start_date.val();
        if (v_start_date == '') {
            obj_input_date.val('');
        } else {
            obj_end_date = $('#' + p_end_date_obj_id);

            v_start_date = parseDate(v_start_date);
            v_new_date = new Date(v_start_date);
            v_new_date.setDate(v_new_date.getDate() + number_week * 7);

            obj_end_date.val(dateFormat(v_new_date, 'DD-MM-YYYY'));
        }
    }
}

function insert_element_from_oject_to_checkbox_list(p_obj, p_block_id, p_name) {
    if (document.getElementById(p_block_id)) {
        if (p_obj.checked) {
            v_str = '<div id="' + p_name + '_' + p_obj.value + '"><label><input type="checkbox" name="' + p_name + '[]" value="' + p_obj.value + '" class="' + p_name + '" data-parent-selected="' + $(p_obj).attr('data-parent') + '" onclick ="chon_chuyen_muc_cap_2(this, \'data-parent-selected\');"/> ' + $(p_obj).attr('data-label') + '</label></div>';
            $('#' + p_block_id).append(v_str);
        } else {
            $('#' + p_name + '_' + p_obj.value).remove();
        }
    }
    $('input[data-parent="' + p_obj.value + '"]').each(function (i) {
        $(this).attr("checked", p_obj.checked);
        if (document.getElementById(p_block_id)) {
            insert_element_from_oject_to_checkbox_list(this, p_block_id, p_name);
        }
    });
}

var tinytip = function () {
    var id = 'tt';
    var top = 0;
    var left = 0;
    var maxw = 400;
    var speed = 10;
    var timer = 10;
    var endalpha = 100;
    var alpha = 20;
    var tt, t, c, b, h;
    var ie = document.all ? true : false;
    return {
        show: function (v, w) {
            if (tt == null) {
                tt = document.createElement('div');
                tt.setAttribute('id', id);
                t = document.createElement('div');
                t.setAttribute('id', id + 'top');
                c = document.createElement('div');
                c.setAttribute('id', id + 'cont');
                b = document.createElement('div');
                b.setAttribute('id', id + 'bot');
                tt.appendChild(t);
                tt.appendChild(c);
                tt.appendChild(b);
                document.body.appendChild(tt);
                tt.style.opacity = 0;
                tt.style.filter = 'alpha(opacity=0)';
                document.onmousemove = this.pos;
            }
            tt.style.display = 'block';
            c.innerHTML = v;
            tt.style.width = w ? w + 'px' : 'auto';
            if (!w && ie) {
                t.style.display = 'none';
                b.style.display = 'none';
                tt.style.width = tt.offsetWidth;
                t.style.display = 'block';
                b.style.display = 'block';
            }
            if (tt.offsetWidth > maxw) {
                tt.style.width = maxw + 'px'
            }
            h = parseInt(tt.offsetHeight) + top;
            clearInterval(tt.timer);
            tt.timer = setInterval(function () {
                tinytip.fade(1)
            }, timer);
        },
        pos: function (e) {
            var u = ie ? event.clientY + document.documentElement.scrollTop : e.pageY;
            var l = ie ? event.clientX + document.documentElement.scrollLeft : e.pageX;
            tt.style.top = (u - 20) + 'px';
            //tt.style.left = (l - tt.offsetWidth) + 'px';
            tt.style.left = (l + 15) + 'px';
        },
        fade: function (d) {
            var a = alpha;
            if ((a != endalpha && d == 1) || (a != 0 && d == -1)) {
                var i = speed;
                if (endalpha - a < speed && d == 1) {
                    i = endalpha - a;
                } else if (alpha < speed && d == -1) {
                    i = a;
                }
                alpha = a + (i * d);
                tt.style.opacity = alpha * .01;
                tt.style.filter = 'alpha(opacity=' + alpha + ')';
            } else {
                clearInterval(tt.timer);
                if (d == -1) {
                    tt.style.display = 'none'
                }
            }
        },
        hide: function () {
            clearInterval(tt.timer);
            tt.timer = setInterval(function () {
                tinytip.fade(-1)
            }, timer);
        }
    };
}();

function toggleElement(elementID) {
    tblObj = document.getElementById(elementID);
    tblObj.style.display = (tblObj.style.display == 'none') ? '' : 'none';
}

/*
 * Ham an nut lenh khi nhan nut cap nhat
 * param p_object_class : ten class cua nut lenh 
 * param p_class_button : ten class cua doi tuong chua cac nut lenh ( tr, div, ...)
 */
function set_disable_link(p_object_class, p_class_button) {
    $(document).ready(function () {
        $(function () {
            $("." + p_object_class).click(function () {
                $('.' + p_class_button).hide(); // an doi tuong chua cac nut lenh 			
            });
        });
    });
}

/*
 * Ham hien thi cac nut lenh khi co loi xay ra trong qua trinh cap nhat
 * param p_class_button : ten class cua doi tuong chua nut lenh  ( tr, div, ...)
 */
function set_enable_link(p_class_button) {
    $('.' + p_class_button).show();
}

// Kiem tra phan tu the_element co trong danh sach the_list hay khong
function list_have_element(the_list, the_element, the_separator) {
    try {
        if (the_list == "") return -1;
        if (the_list == the_element) return 1;
        if (the_list.indexOf(the_separator) == -1) return -1;
        arr_value = the_list.split(the_separator);
        for (var i = 0; i < arr_value.length; i++) {
            if (arr_value[i] == the_element) {
                return i;
            }
        }
    } catch (e) {
        ;
    }
    return -1;
}
// Ham gan gia tri cho o textbox
function putElementToTextbox(elementValue, p_textbox_id) {
    var objTextbox = window.document.getElementById(p_textbox_id);
    if (!objTextbox) {
        return false;
    }
    objTextbox.value = elementValue;
}


/*
 * Ham gan gia tri duoc chon cho selectbox sau khi AutoComplete
 * @author  ducnq - 04/10/2012
 * @param  select_id id cua selectbox
 * @param  hdn_id id hdn luu gia tri truoc do
 * @param  hdn_tong id cua hidden luu tong so doi tuong
 * @param  txt_input id cua textbox tim nhanh
 * @param  is_submit co submit form hay khong
 * @param  form_id Nhap ten form neu is_submit = 1 (tuc la co submit)
 * @return  string
 */
function set_selected_index_to_selectbox(select_id, hdn_id, txt_input, is_submit, form_id) {
    var id_duoc_chon = document.getElementById(hdn_id).value;
    $('#' + select_id).val(id_duoc_chon);
    if (is_submit == 1) {
        $('#' + txt_input).val('');
        eval("document." + form_id + ".submit()");
    }
    return false;
}



/*
 * Ham gan gia tri duoc chon cho checkbox sau khi AutoComplete
 * @author  phuonghv - 24/02/2014
 * @param  checkbox_id id cua checkbox
 * @param  hdn_id id hdn luu gia tri truoc do
 * @param  hdn_tong id cua hidden luu tong so doi tuong
 * @param  txt_input id cua textbox tim nhanh
 * @param  is_submit co submit form hay khong
 * @param  form_id Nhap ten form neu is_submit = 1 (tuc la co submit)
 * @return  string
 */
function set_selected_index_to_checkbox(checkbox_id, hdn_id, hdn_tong, txt_input, is_submit, form_id) {
    var id_duoc_chon = document.getElementById(hdn_id).value;
    var i = 0;
    var v_count = document.getElementById(hdn_tong).value;
    for (i = 0; i < v_count; i++) {
        var p_check_obj = document.getElementById(checkbox_id + '[' + i + ']');
        if (p_check_obj.value == id_duoc_chon) {
            p_check_obj.checked = true;
            p_check_obj.focus();
            $('#' + txt_input).val('');
            $('#' + txt_input).focus();
            if (is_submit == 1) {
                eval("document." + form_id + ".submit()");
            }
        }
    }
    return false;
}

/*
 * Ham chi cho phep nhap du lieu kieu so 
 * @author  phuonghv - 04/10/2014 
 * @return  string
 */
function _chi_nhap_kieu_so(p_object) {
    v_value = p_object.value;
    v_value = v_value.replace(/[^0-9\,\.]/g, ''); // loai bo ky tu khong phai kieu so    
    p_object.value = v_value;
}
/*
 * Ham chi cho phep nhap du lieu kieu text
 * @author  phuonghv - 04/10/2014 
 * @return  string
 */
function _chi_nhap_kieu_text(p_object) {
    v_value = p_object.value;
    v_value = v_value.replace(/[0-9\,\.]/g, ''); // loai bo ky tu kieu so    
    p_object.value = v_value;
}

/*
 * Ham hien thi lai selectbox tinh thanh khi quoc gia thay doi
 * @author  phuonghv - 04/10/2014 
 * @return  string
 */
function quoc_gia_onchange(p_object, p_select_list_id) {
    v_url = '/ajax/quan_huyen/dsp_tinh_thanh/' + p_object.value;
    $.get(v_url, function (data) {
        if (data != '') {
            v_data = jQuery.parseJSON(data)
            if (v_data) {
                resetSelectList(p_select_list_id);
                for (i = 0; i < v_data.length; i++) {
                    putElementToSelectList(v_data[i].c_name, v_data[i].pk_id, p_select_list_id);
                }
            }
        }
    });
}

/*
 * Ham dinh dang kieu tien te
 * @author ducnq
 * @param control Obj textbox 
 * @param event e su kien nhap tu ban phim 
 * @return string
 */
function format_money_ff(Obj, e) {
    _DECIMAL_DELIMITOR = '.';
    _THOUSAND_DELIMITOR = ',';
    var theKey = window.event ? event.keyCode : e.which;
    if (theKey == 8 || theKey == 46) {
        // nsd xoá thì ko làm gì hết
        return;
    }
    var theStringNum = Obj.value;
    theSecondStringNum = "";
    // Neu ki tu dau tien la phan cach thap phan thi bo qua
    if (theStringNum == _DECIMAL_DELIMITOR) {
        Obj.value = "";
        return;
    }
    var the_first_char = theStringNum.substr(0, 1);
    if (the_first_char == "-") {
        theStringNum = theStringNum.substr(1, theStringNum.length - 1);
    } else {
        the_first_char = "";
    }
    var theLen = theStringNum.length;

    pos = theStringNum.indexOf(_DECIMAL_DELIMITOR, 0)
    if (pos > 0) {
        arr_numstr = theStringNum.split(_DECIMAL_DELIMITOR);
        theFirstStringNum = theStringNum.substr(0, pos);
        theSecondStringNum = theStringNum.substr(pos + 1, theStringNum.length - pos);
        if (theSecondStringNum.substr(theSecondStringNum.length - 1, 1) == _DECIMAL_DELIMITOR) {
            Obj.value = the_first_char + theStringNum.substr(0, theStringNum.length - 1);
            return;
        }
        theStringNum = theFirstStringNum;
    }
    //Chi nhan cac ky tu la so
    if ((theKey >= 48 && theKey <= 57) || (theKey >= 96 && theKey <= 105)) {
        var theNewString;
        var theSubString;
        var LastIndex;
        LastIndex = 0;
        theSubString = ""
        // Thay the ky tu phan cach phan nghin
        for (var i = 0; i < theStringNum.length; i++) {
            if (theStringNum.substring(i, i + 1) == _THOUSAND_DELIMITOR) // Tim ky tu phan cach phan nghin
            {
                theSubString = theSubString + theStringNum.substring(LastIndex, i)
                LastIndex = i + 1;
            }
        }
        theSubString = theSubString + theStringNum.substring(LastIndex, theStringNum.length) // Lay mot doan cuoi cung (vi doan cuoi cung khong co ky tu phan cach phan nghin)
        theStringNum = theSubString;

        theNewString = ""
        if (theStringNum.length > 3)
            while (theStringNum.length > 3) {
                theSubString = theStringNum.substring(theStringNum.length - 3, theStringNum.length);
                theStringNum = theStringNum.substring(0, theStringNum.length - 3);
                theNewString = _THOUSAND_DELIMITOR + theSubString + theNewString;
            }
        if (pos > 0)
            theNewString = theStringNum + theNewString + "." + theSecondStringNum;
        else
            theNewString = theStringNum + theNewString;
        if (theLen > 3)
            Obj.value = the_first_char + theNewString;
    }
    v_value = Obj.value;
    v_value = v_value.replace(/[^0-9\,\.]/g, ''); // loai bo ky tu khong phai kieu so    
    Obj.value = v_value;
}

/*
 * Ham mở cửa sổ dialog để nhập liệu
 *@param string p_object_id
 *@param string p_id_dialog ID thẻ div
 */
function open_dialog(p_id_dialog, p_object_id) {
    push_data_to_form_statement_of_account(p_object_id);
    $('#' + p_id_dialog)
        .modal({
            keyboard: false,
            //backdrop: "static"
        })
        .on('shown.bs.modal', function (event) { })
        .on('hide.bs.modal', function (event) {
            set_enable_link("tr_button");
            //reset giá trị trong dialog
            push_data_to_form_statement_of_account('');
        });
}

/*
 * Ham mở cửa sổ dialog để chọn đơn bảo hiểm
 *@param string p_object_id
 *@param string p_id_dialog ID thẻ div
 */
function open_dialog_common(p_id_dialog) {
    $('#' + p_id_dialog)
        .modal({
            keyboard: false,
            backdrop: "static"
        })
        .on('shown.bs.modal', function (event) {

        })
        .on('hide.bs.modal', function (event) {
            set_enable_link("tr_button");
            //reset giá trị trong dialog
            push_data_to_form_statement_of_account('');
        });
}
/*
 *Ham thông báo lỗi của hệ thống
 *@param string p_message : nội dung thông báo lỗi.
 *@param string p_call_back : callback function xử lý khi click vào nút OK trên dialog
 */
function _alert(p_message, p_call_back) {
    Alert(p_message, p_call_back);
}

function _confirm(p_message, p_call_back) {

    // optionsAlert.title = "Thông báo";
    optionsAlert.html = p_message;
    Swal.fire(optionsAlert).then((result) => {
        if (result.isConfirmed) {
            //    frm_submit(p_forms, p_action_url, p_target);
            //    v_is_ok = true;
        }
    });
    return;
}
/*
 *Ham đặt focus vào control
 *@param string p_control_id : ID control.
 */
function _set_focus(p_control_id) {
    $("#" + p_control_id).focus();
}

/*
 *Ham đặt focus vào control
 *@param string p_control_id : ID control.
 */
function _set_select(p_control_id) {
    $("#" + p_control_id).select();
}

/*
 *Ham đặt  select2  open vào control
 *@param string p_control_id : ID control.
 */
function _open_select2(p_control_id) {
    $("#" + p_control_id).select2('open');
}


function randomizeNumber() {
    today = new Date();
    jran = today.getTime();
    number = 1000000;
    ia = 9301;
    ic = 49297;
    im = 233280;
    jran = (jran * ia + ic) % im;
    return Math.ceil((jran / (im * 1.0)) * number);
}


function open_dialog2(p_id_dialog, name, file) {
    push_data_to_form_mau_in(name, file);
    $('#' + p_id_dialog)
        .modal({
            keyboard: false,
            //backdrop: "static"
        })
        .on('shown.bs.modal', function (event) { })
        .on('hide.bs.modal', function (event) {
            set_enable_link("tr_button");
            //reset giá trị trong dialog
            push_data_to_form_mau_in('');
        });
}

function push_data_to_form_mau_in(name, file) {
    $('#myModalLabel').html(name);
    var content = '<iframe width="100%" height="500px" src="https://docs.google.com/viewer?url=' + file + '&embedded=true" frameborder="0"></iframe>';
    $('#frame').html(content);
}

function GetExcel(startupPath = '') {
    CKFinder.popup({
        startupPath: 'Files:' + startupPath,
        startupFolderExpanded: false,
        rememberLastFolder: false,
        chooseFiles: true,
        width: 800,
        height: 600,
        onInit: function (finder) {
            finder.on('files:choose', function (evt) {
                var file = evt.data.files.first();
                var file_url = file.getUrl();
                SetFileExcel(decodeURI(file.getUrl().toString()));
            });

            finder.on('file:choose:resizedImage', function (evt) {
                var file_url = evt.data.resizedUrl;
            });
        }
    });
}

function BrowseServer() {
    CKFinder.popup({
        chooseFiles: true,
        width: 800,
        height: 600,
        onInit: function (finder) {
            finder.on('files:choose', function (evt) {
                var file = evt.data.files.first();
                var file_url = file.getUrl();
                SetFileField(file_url);
            });

            finder.on('file:choose:resizedImage', function (evt) {
                var file_url = evt.data.resizedUrl;
            });
        }
    });
}

/**
 *  Ham thuc hien refresh lai man hinh cap nhat snippet rating khi onchange rad_loai_trang
 * Dantv added on 25/06/2016
 * @param  p_object_value:  trang duoc chon (news, tag, event)
 * @param  p_go_to_url:  url hien thi chi tiet 1 snippet rating
 * @param  p_url_goback:  url goback
 */
function nhom_linh_vuc_onchange(p_object_value) {
    var v_url = CONFIG.BASE_URL + 'ajax/loai_cong_trinh/dsp_danh_sach_nhom_cong_trinh/' + p_object_value;
    AjaxAction('div_nhom_cong_trinh', v_url);
}

function format_money(Obj, event) {
    var _DECIMAL_DELIMITOR = ',';
    var theKey;
    //var keyCode = (document.layers) ? keyStroke.which : event.keyCode;
    if (typeof (event) == "undefined") {
        theKey = window.event.keyCode;
    } else {
        theKey = (window.event) ? event.keyCode : event.which;
    }
    //var theKey = event.keyCode;
    var theStringNum = Obj.value;
    theSecondStringNum = "";
    // Neu ki tu dau tien la "." thi bo qua
    if (theStringNum == ".") {
        Obj.value = "";
        return;
    }
    var the_first_char = theStringNum.substr(0, 1);
    if (the_first_char == "-") {
        theStringNum = theStringNum.substr(1, theStringNum.length - 1);
    } else {
        the_first_char = "";
    }
    var theLen = theStringNum.length;

    pos = theStringNum.indexOf(".", 0)
    if (pos > 0) {
        arr_numstr = theStringNum.split(".");
        theFirstStringNum = theStringNum.substr(0, pos);
        theSecondStringNum = theStringNum.substr(pos + 1, theStringNum.length - pos);
        if (theSecondStringNum.substr(theSecondStringNum.length - 1, 1) == ".") {
            Obj.value = the_first_char + theStringNum.substr(0, theStringNum.length - 1);
            return;
        }
        theStringNum = theFirstStringNum;
    }
    //Chi nhan cac ky tu la so
    if ((theKey >= 48 && theKey <= 57) || (theKey >= 96 && theKey <= 105) || (theKey == 8)) {
        var theNewString;
        var theSubString;
        var LastIndex;
        LastIndex = 0;
        theSubString = ""
        // Thay the ky tu ","
        for (var i = 0; i < theStringNum.length; i++) {
            if (theStringNum.substring(i, i + 1) == _DECIMAL_DELIMITOR) // Tim ky tu ","
            {
                theSubString = theSubString + theStringNum.substring(LastIndex, i)
                LastIndex = i + 1;
            }
        }
        theSubString = theSubString + theStringNum.substring(LastIndex, theStringNum.length) // Lay mot doan cuoi cung (vi doan cuoi cung khong co ky tu ",")
        theStringNum = theSubString;

        theNewString = ""
        if (theStringNum.length > 3)
            while (theStringNum.length > 3) {
                theSubString = theStringNum.substring(theStringNum.length - 3, theStringNum.length);
                theStringNum = theStringNum.substring(0, theStringNum.length - 3);
                theNewString = _DECIMAL_DELIMITOR + theSubString + theNewString;
            }
        if (pos > 0)
            theNewString = theStringNum + theNewString + "." + theSecondStringNum;
        else
            theNewString = theStringNum + theNewString;

        if (theLen > 3)
            Obj.value = the_first_char + theNewString;
        try {
            Obj.onchange();
        } catch (e) {
            ;
        }
    }
}

function format_string_to_money(Obj) {
    var theLen = Obj.value.length;
    var theStringNum = Obj.value;
    var the_first_char = theStringNum.substr(0, 1);
    if (the_first_char == "-") {
        theStringNum = theStringNum.substr(1, theStringNum.length - 1);
    } else {
        the_first_char = "";
    }
    if (theStringNum == ".") {
        Obj.value = "";
        return;
    }
    theSecondStringNum = "";
    pos = theStringNum.indexOf(".", 0)
    if (pos > 0) {
        arr_numstr = theStringNum.split(".");
        theFirstStringNum = theStringNum.substr(0, pos);
        theSecondStringNum = theStringNum.substr(pos + 1, theStringNum.length - pos);
        if (theSecondStringNum.substr(theSecondStringNum.length - 1, 1) == ".") {
            Obj.value = theStringNum.substr(0, theStringNum.length - 1);
            return;
        }
        theStringNum = theFirstStringNum;
    }
    var theNewString;
    var theSubString;
    theSubString = "";
    theNewString = ""
    while (theStringNum.length > 3) {
        theSubString = theStringNum.substring(theStringNum.length - 3, theStringNum.length);
        theStringNum = theStringNum.substring(0, theStringNum.length - 3);
        theNewString = "," + theSubString + theNewString;
    }
    if (pos > 0)
        theNewString = theStringNum + theNewString + "." + theSecondStringNum;
    else
        theNewString = theStringNum + theNewString;
    if (theLen > 3)
        Obj.value = the_first_char + theNewString;
}

function load_tien_vnd() {
    v_tien_usd = document.forms[0].txt_usd.value.replace(/\$|\,/g, '');
    v_tien_usd = v_tien_usd == "" ? 0 : v_tien_usd;
    v_ty_gia = document.forms[0].txt_ty_gia.value.replace(/\$|\,/g, '');
    v_ty_gia = v_ty_gia == "" ? 0 : v_ty_gia;
    v_tien_vnd = parseFloat(v_tien_usd) * parseFloat(v_ty_gia);
    document.forms[0].txt_so_tien.value = v_tien_vnd;
    format_string_to_money(document.forms[0].txt_so_tien);
}

//Ham FormatDate dinh dang hien thi kieu thoi gian "Ngay/Thang/Nam" trong khi nhap du lieu
//Ham nay chi cho phep nhap cac ki tu dang so, neu nhap bat ky ki tu nao khac se khong nhan
//Ham nay duoc goi trong su kien onKeyUp cua cac text_box. onKeyUp="FormatDate(this,'/')"
//Tham so:
//	-txt_obj (Object): doi tuong text box nhap du lieu kieu thoi gian
//	-separator_char (character): dau ngan cach giua ngay, thang va nam (Vi du: dau ":", dau "/", dau "|", dau "-", ...)
function FormatDate(txt_obj, separator_char, event) {
    //Lay gia tri ma ASCII cua phim an
    var theKey;
    //var keyCode = (document.layers) ? keyStroke.which : event.keyCode;
    if (typeof (event) == "undefined") {
        theKey = window.event.keyCode;
    } else {
        theKey = (window.event) ? event.keyCode : event.which;
    }
    //var theKey = event.keyCode;
    var theLen = txt_obj.value.length;
    //Neu an phim BackSpace, Up, Down, Left, Right, Home, End thi khong xu ly
    if (theKey == 8 || theKey == 37 || theKey == 39 || theKey == 40) {
        return 1;
    }
    //Loai bo cac ki tu khong phai ky tu so (ke ca dau phan cach ngay thang nam)
    theStr = "";
    for (var i = 0; i < theLen; i++) {
        theChar = txt_obj.value.charCodeAt(i);
        if (theChar >= 48 & theChar <= 57) {
            theStr = theStr + txt_obj.value.substring(i, i + 1);
        }
    }
    theLen = theStr.length;
    // Xu ly tao format theo dang thoi gian dd/mm/yyyy
    if (theLen >= 4) {
        theDate = theStr.substring(0, 2);
        theMonth = theStr.substring(2, 4);
        theYear = theStr.substring(4);
        txt_obj.value = theDate + separator_char + theMonth + separator_char + theYear;
    } else {
        if (theLen >= 2) {
            theDate = theStr.substring(0, 2);
            theMonth = theStr.substring(2);
            txt_obj.value = theDate + separator_char + theMonth;
        } else {
            txt_obj.value = theStr;
        }
    }
    return 1;
}

function check_date(p_obj, event) {
    FormatDate(p_obj, "-", event);
}

// add a value to a list
function list_append(the_list, the_value, the_separator) {
    var list = the_list;
    the_value = the_value + ""; //Chuyen the_value sang kieu xau
    if (list == "") list = the_value;
    else if (the_value != "") list = list + the_separator + the_value;
    return list;
}

function replace(string, text, by) {
    var strLength = string.length,
        txtLength = text.length;
    var newstr = string;
    if ((strLength == 0) || (txtLength == 0)) return string;
    try {
        var i = string.indexOf(text);
        if ((!i) && (text != string.substring(0, txtLength))) return string;
        if (i == -1) return string;

        newstr = string.substring(0, i) + by;

        if (i + txtLength < strLength)
            newstr += replace(string.substring(i + txtLength, strLength), text, by);
    } catch (e) {
        ;
    }
    return newstr;
}

function btn_select_onclick(p_forms) {
    var index = p_forms.hdn_index.value;
    var c_code = '',
        c_name = '',
        c_policy_type = '';
    var v_record_count = p_forms.hdn_record_count.value * 1;
    for (var i = 0; i < v_record_count; i++) {
        var p_check_obj = eval("p_forms.chk_item_id" + i);
        if (p_check_obj && p_check_obj.checked == true) {
            c_code = eval("p_forms.chk_item_id" + i + ".value");
            c_name = eval("p_forms.c_name" + i + ".value");
            c_policy_type = eval("p_forms.c_policy_type" + i + ".value");
            break;
        }
    }
    var target_code = parent.window.opener.document.getElementById("pham_vima_pham_vi" + index);
    if (target_code) {
        target_code.value = c_code;
    }
    var target_name = parent.window.opener.document.getElementById("pham_viname_pham_vi" + index);
    if (target_name) {
        target_name.value = c_name;
    }
    var target_policy_type = parent.window.opener.document.getElementById("pham_vipolicy_type" + index);
    if (target_policy_type) {
        target_policy_type.value = c_policy_type;
    }
    window.parent.close();
}

var post = function (path, params, target = 'frm_submit', method = 'post') {
    var form = $('<form></form>');

    form.attr("target", target);
    form.attr("method", method);
    form.attr("action", path);

    $.each(params, function (key, value) {
        var field = $('<input></input>');

        field.attr("type", "hidden");
        field.attr("name", key);
        field.attr("value", value);

        form.append(field);
    });

    // The form needs to be a part of the document in
    // order for us to be able to submit it.
    $(document.body).append(form);
    form.trigger("submit");
}

var remove_file_id = function (elem) {
    console.log(elem)
    $(elem).parent().parent().remove();
}


/**
 * function hiển thị danh sách thông báo
 * @param  {string} message [message text]
 * @param  {String} type    [type of message success, error, warning]
 * @return
 */
function show_toast_message(message, type = 'success') {
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": true,
        "progressBar": true,
        "positionClass": "toast-top-right",
        "preventDuplicates": false,
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "10000",
        "extendedTimeOut": "0",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    var $toast = toastr[type](message);
}

/**
 * function Kiểm tra kết quả trả về
 * @param  object or string response
 * @return 
 */
function ajax_response(response) {

    if (typeof response != 'object') {
        response = JSON.parse(response);
    }
    // console.log( response)
    toastr.clear();

    if (response.code == 200 && response.error == false) {

        if (!Array.isArray(response.message) && typeof response.message === 'string') {
            show_toast_message(response.message);
            toastr.clear();
            return;
        }

        $.each(response.message, function (index, value) {
            show_toast_message(value);
        });

        return true;
    } else {
        if (!Array.isArray(response.message) && typeof response.message === 'string') {
            show_toast_message(response.message, 'error');
            // Set focus cho body trả về
            if (response.body.hasOwnProperty('focus')) {
                if (typeof response.body.focus === 'string' && response.body.focus !== 'undefined') {
                    _set_focus(response.body.focus);
                }
            }
            return;
        }

        $.each(response.message, function (index, value) {
            show_toast_message(value, 'error');
        });

        // Set focus cho body trả về
        if (response.body.hasOwnProperty('focus')) {
            if (typeof response.body.focus === 'string' && response.body.focus !== 'undefined') {
                _set_focus(response.body.focus);
            }
        }

        return false;
    }
}


/**
 * function Kiểm tra kết quả trả về
 * @param  object or string response
 * @return 
 */
function ajax_response2(response) {

    response = JSON.parse(response);
    if (response.code == 200 && response.error == false) {

        if (!Array.isArray(response.message) && typeof response.message === 'string') {
            show_toast_message(response.message);
            return;
        }

        $.each(response.message, function (index, value) {
            show_toast_message(value);
            window.location.href = response.body;
        });
        return true;
    } else {
        if (!Array.isArray(response.message) && typeof response.message === 'string') {
            show_toast_message(response.message, 'error');
            return;
        }

        $.each(response.message, function (index, value) {
            show_toast_message(value, 'error');
        });
        return false;
    }
}


/*
 * Reset file input - Xoá giá trị file đã lưu trên trình duyệt
 * @author  datlv - 10/10/2022
 * @param  form - ID của form
 * @return  
 */
function reset_file_input() {
    $("input[type='file']").val("");
}


/*
 * Cập nhật file
 * @author  datlv - 10/10/2022
 * @param  form - ID của form
 * @return  
 */
var upload_file_ajax = function (form) {
    if ($(form).length < 0) {
        console.warn("Lỗi form: " + form);
        return;
    }
    // console.info(form);
    var form_method = $(form).attr("method");
    var form_action = $(form).attr("action");

    var form_data = new FormData();

    // Lấy danh sách file
    $.each($("input[type='file']")[0].files, function (i, file) {
        form_data.append('files[]', file);
    });

    // Lấy danh sách form control posr đi
    $.each($(form).serializeArray(), function (i, obj) {
        form_data.append(obj.name, obj.value);
    });

    function progress(e) {
        if (e.lengthComputable) {
            let max = e.total;
            let current = e.loaded;
            percentage = (current * 100) / max;
            if (percentage >= 100) {
                $("#progress-bar").css("width", percentage + "%");
                $("#progress-bar").html(Math.round(percentage) + "%");
            }
        }
    }

    $.ajax({
        url: form_action,
        type: form_method,
        // dataType: 'html',
        contentType: false,
        cache: false,
        processData: false,
        data: form_data,
        xhr: function () {
            var myXhr = $.ajaxSettings.xhr();
            if (myXhr.upload) {
                if ($("#progress").length > 0) {
                    myXhr.upload.addEventListener('progress', progress, false);
                }
            }
            return myXhr;
        },
        beforeSend: function () {
            if ($("#progress").length > 0) {
                $("#progress").show();
                $("#progress-bar").css("width", "0%");
                $("#progress-bar").html("0%");
            }
        },
        success: function (response) {
            // console.log(response);

            ajax_response(response); // Hiển thị thông báo response
            get_list_file_ajax(form); // Load lại danh sách file
            count_files_ajax(form); // Đếm số lượng file
            reset_file_input(); // Xoá giá trị lưu file
            return;
        },
        error: function (xhr) {
            show_toast_message("Lỗi: " + xhr.statusText, "error");
            reset_file_input();
        }
    });
};

/*
 * Xoá file đã upload
 * @author  datlv - 10/10/2022
 * @param  form - ID của form
 * @return  
 */
var delete_file_ajax = function (form) {
    if ($(form).length < 0) {
        console.warn("Lỗi form: " + form);
        return;
    }

    var form_method = $(form).attr("method");
    var form_action = CONFIG.BASE_URL + 'ajax/upload/delete_file/';

    // Lấy danh sách dòng có class "".row-checked"
    let row_checked = $(form).find(".row-checked");

    // Lấy danh sách inputcheckbox checked
    let ckb_checked = row_checked.find('input[type=checkbox]:checked');

    if (ckb_checked.length < 1) {
        Alert("Chưa có đối tượng nào được chọn!");
        return false;
    }

    if (row_checked.length > 0) {

        var form_data = new FormData();
        let file_info = JSON.parse($("input[name=file_info]").val());

        form_data.append('p_loai_kpi', file_info.loai_kpi);
        form_data.append('p_kpi_id', file_info.kpi_id);

        // Lấy danh sách file
        $.each($(ckb_checked), function (i, obj) {
            form_data.append('data_files[]', JSON.stringify($(obj).data("json")));
        });

        $.ajax({
            url: form_action,
            type: form_method,
            // dataType: 'html',
            contentType: false,
            cache: false,
            processData: false,
            data: form_data,
            success: function (response) {
                ajax_response(response); // Hiển thị thông báo response
                get_list_file_ajax(form); // Load lại danh sách file
                count_files_ajax(form); // Đếm số lượng file
                reset_file_input(); // Xoá giá trị lưu file
                return;
            },
            error: function (xhr) {
                // $("#result").html("Lỗi Upload: " + xhr.statusText);
                show_toast_message("Lỗi: " + xhr.statusText, "error");
                reset_file_input();
            }
        });
    }
}

/*
 * Load lại danh sách file đã upload
 * @author  datlv - 10/10/2022
 * @param  form - ID của form
 * @return  
 */
var get_list_file_ajax = function (form) {
    // console.log($(form));
    var url = CONFIG.BASE_URL + 'ajax/upload/get_list_file/';
    $.ajax({
        url: url,
        method: 'POST',
        data: $(form).serialize(),
        success: function (response) {
            // console.log(response);
            $('#result').html(response);
            App.initBeforeLoad();
        }
    });
}

var count_files_ajax = function (form) {
    let url = CONFIG.BASE_URL + 'ajax/upload/count_files/';
    let v_loai_kpi = $("input[name=hdn_loai_kpi]").val()
    let v_kpi_id = $("input[name=hdn_kpi_id]").val()
    let v_elem_id = ".id-file-count-" + v_kpi_id
    $.ajax({
        url: url,
        method: 'POST',
        data: $(form).serialize(),
        success: function (response) {
            if ($(v_elem_id).length > 0) {
                $(v_elem_id).html(response)
            } else {
                parent.$(v_elem_id).html(response);
            }
        }
    });
}

var update_file_mota_ajax = function (form, element) {
    let url = CONFIG.BASE_URL + 'ajax/upload/update_file_mota/';
    var form_data = new FormData();
    form_data.append('file_info', $("input[name=file_info]").val());
    form_data.append('file_mota', $(element).val());

    $.ajax({
        url: url,
        contentType: false,
        cache: false,
        processData: false,
        method: 'POST',
        data: form_data,
        success: function (response) {
            ajax_response(response); // Hiển thị thông báo response
            get_list_file_ajax(form); // Load lại danh sách file
            console.log(response)
            // parent.$(v_elem_id).html(response);
        }
    });
}


/*
 * Bảng upload file cho bảng KPI
 * @author  datlv - 10/10/2022
 * @param  p_kpi_id id - ID của bảng kpi hoặc ID kpi chi tiết
 * @param  p_type id - 1:Loại Bảng kpi, 2: KPI chi tiết
 * @param  p_permisstion: true - có quyền upload, false - không có quyền upload
 * @return  
 */
function open_upload_file_kpi(p_kpi_id, p_type, p_permisstion = true) {
    let url = CONFIG.BASE_URL + 'upload/index';
    let v_url = url + "?p_kpi_id=" + p_kpi_id + "&p_loai_kpi=" + p_type + "&p_permisstion=" + p_permisstion;
    openWindow(v_url);
}



var check_ty_trong = function (elem) {
    let list_input = $("input[name='v_ti_trong[]']")
    let v_sum_ty_trong = 0;
    $.each(list_input, function (indexInArray, valueOfElement) {
        v_sum_ty_trong += parseFloat(valueOfElement.value);
    });
    $("#sum_ty_trong").html(v_sum_ty_trong);
}


function executeFunctionByName(functionName, context, args) {
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split(".");
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

// Example starter JavaScript for disabling form submissions if there are invalid fields
(function () {
    'use strict'

    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    var forms = document.querySelectorAll('.needs-validation')

    // Loop over them and prevent submission
    Array.prototype.slice.call(forms)
        .forEach(function (form) {
            form.addEventListener('submit', function (event) {
                if (!form.checkValidity()) {
                    event.preventDefault()
                    event.stopPropagation()
                }

                form.classList.add('was-validated')
            }, false)
        })
})()


// Show pass
var show_password = function (p_this) {
    console.log($(p_this))
    var x = $(p_this).parent().find("input")[0];
    if (x.type === "password") {
        x.type = "text";
        $(p_this).addClass("show");
    } else {
        x.type = "password";
        $(p_this).removeClass("show");
    }
};

// Set focus item 
var set_focus_alert = function (p_control_id) {
    $("#" + p_control_id).focus();
    Swal.close();
}
// Set focus item 
var set_focus_obj_alert = function (p_control_id) {
    console.log((p_control_id))
    $(p_control_id).focus();
    Swal.close();
}
// Set focus item 
var set_focus_name_alert = function (p_name) {
    $("[name='" + p_name + "']").focus();
    Swal.close();
}



// Khai báo đối tượng options cho SweatAlert2
var optionsAlert = {
    title: "",
    html: "",
    width: "auto",
    padding: "20px",
    position: "top",
    showConfirmButton: true,
    showCancelButton: true,
    showDenyButton: false,
    customClass: {
        container: "swal2-style text-sm 2xl:text-base",
        actions: "btn-list",
        confirmButton: "btn bg-primary text-white",
        cancelButton: "btn btn-sub",
    },
    confirmButtonText: "Đồng ý",
    cancelButtonText: "Huỷ",
    buttonsStyling: false,
    allowOutsideClick: false,
};

// Alert - Thông báo
var Alert = function (
    content,
    btnFunction,
    title = "",
    sizeAlert,
    btnText,
    btnClass,

) {
    if (title.length == 0) title = "Thông báo"; // Tiêu đề Thông báo
    if ($.trim(content).length == 0) content = ""; // Nội dung Thông báo
    if ($.trim(sizeAlert).length == 0) sizeAlert = "m"; // Kích thước thông báo: xs, s, n, l, xl. Mặc định: m
    if ($.trim(btnText).length == 0) btnText = "Xác nhận"; // Tiêu đề button thông báo. Mặc định: "Xác nhận"
    if ($.trim(btnClass).length == 0) btnClass = "btn bg-primary text-white"; // Class style button
    if ($.trim(btnFunction).length == 0) btnFunction = "Swal.close();"; // Function khi click vào button

    let width;
    let position = "top";

    switch (sizeAlert) {
        case "xs":
            width = "200px";
            break;

        case "s":
            width = "300px";
            break;

        case "m":
            width = "400px";
            break;

        case "l":
            width = "500px";
            break;
        case "xl":
            width = "600px";
            break;

        default:
            width = "auto";
            break;
    }

    Swal.fire({
        title: title,
        html: content,
        width: width,
        padding: "20px",
        position: position,
        showConfirmButton: false,
        showCancelButton: false,
        showDenyButton: false,
        customClass: {
            container: "swal2-style text-sm 2xl:text-base",
            confirmButton: btnClass,
        },
        confirmButtonText: btnText,
        buttonsStyling: false,
        allowOutsideClick: false,
        footer: `<button onclick="` +
            btnFunction +
            `" class="` +
            btnClass +
            `">` +
            btnText +
            `</button>`,
    });
};

// Alert - Thông báo truyền tham số data-attribute html
var AlertData = function (element) {
    let elem = $(element);
    let title = elem.data("title"); // Tiêu đề
    let content = elem.data("content"); // Nội dung
    let btnText = elem.data("btn-text");
    let btnClass = elem.data("btn-class");
    let dataFunction = elem.data("function"); // Chạy Function thì urlCallback không dùng được
    let urlCallback = elem.data("callback"); // Callback sang url khác khi click button
    let position = elem.data("position"); // Vị trí hiển thị
    let size = elem.data("size"); // Size Alert: xs, s, n, l, xl. Default: auto
    let width;
    let showConfirmButton = true;

    if ($.trim(title).length == 0) title = "Cảnh báo!";
    if ($.trim(content).length == 0) content = "";
    if ($.trim(btnText).length == 0) btnText = "Đồng ý";
    if ($.trim(btnClass).length == 0) btnClass = "btn bg-primary text-white";
    if ($.trim(position).length == 0) position = "top";
    if ($.trim(size).length == 0) size = "m";

    switch (size) {
        case "xs":
            width = "200px";
            break;

        case "s":
            width = "300px";
            break;

        case "m":
            width = "400px";
            break;

        case "l":
            width = "500px";
            break;
        case "xl":
            width = "600px";
            break;

        default:
            width = "auto";
            break;
    }

    if ($.trim(dataFunction).length > 0) {
        showConfirmButton = false;
        var customButton =
            `<button onclick="` +
            dataFunction +
            `" class="` +
            btnClass +
            `">` +
            btnText +
            `</button>`;
    }

    Swal.fire({
        title: title,
        html: content,
        width: width,
        padding: "20px",
        position: position,
        showConfirmButton: showConfirmButton,
        showCancelButton: false,
        showDenyButton: false,
        customClass: {
            container: "swal2-style text-sm 2xl:text-base",
            confirmButton: btnClass,
        },
        confirmButtonText: btnText,
        buttonsStyling: false,
        allowOutsideClick: false,
        footer: `<button onclick="` +
            dataFunction +
            `" class="` +
            btnClass +
            `">` +
            btnText +
            `</button>`,
    }).then((result) => {
        if (result.isConfirmed) {
            if (urlCallback.length > 0) {
                window.location.href = urlCallback;
            }
        }
    });
};

$(document).on("click", ".fancybox-close", function () {
    // Kiểm tra data thay đổi
    if ($('[data-changed]').length > 0) {
        $check_changed = $('[data-changed]').data("changed");
        if ($check_changed) {
            optionsAlert.html = "Dữ liệu chưa được lưu.\nBạn có chắc chắn muốn thoát?";
            Swal.fire(optionsAlert).then((result) => {
                if (result.isConfirmed) {
                    parent.$.fancybox.close();
                }
            });
            return;
        }
    }
    parent.$.fancybox.close();
});

var fancyboxClose = function (element) {
    parent.$.fancybox.close();
};

// Hiển thị cửa sổ Popup
var openWindow = function (p_source, options) {
    let source = p_source; // nguồn hiển thì. Nếu type='inline' là ID của html, hoặc url nếu type='iframe'
    let otps = {
        type: "iframe", // Loại hiển thị. type='inline' - Hiển thị html inline, type='iframe' - Hiển thị qua iframe
        allowClose: false, // Cho phép người dùng nhấn ra ngoài để đóng cửa sổ hiển thi
        size: "xl", // Size Alert: xs, s, n, l, xl. Default: auto
        modal: false, // Modal hiển thì theo dạng modal. Mặc định: false
    }
    $.extend(otps, options);

    // Cho phép đóng cửa sổ hiển thi hay không
    if (otps.allowClose == false) {
        clickSlide = false;
        clickOutside = false;
    } else {
        clickSlide = "close";
        clickOutside = "close";
    }

    // Xoá Toastr Message
    toastr.clear();

    $.fancybox.open({
        src: source,
        type: otps.type,
        // closeExisting: .optionscloseExisting,
        iframe: {
            preload: false,
        },
        opts: {
            btnTpl: {
                smallBtn: "",
            },
            modal: otps.modal,
            touch: false,
            clickSlide: clickSlide,
            clickOutside: clickOutside,
            beforeClose: function (instance, current) {
                toastr.clear();
            }
        },
    }, {
        baseClass: "fancybox-style",
        slideClass: "fancybox-slide-" + otps.size,
    });
};


// Hiển thị cửa sổ Popup truyền thuộc tính HTML data attribute
var openWindowData = function (element) {
    let elem = $(element);
    let type = elem.data("type"); // Loại hiển thị. type='inline' - Hiển thị html inline, type='iframe' - Hiển thị qua iframe
    let allowClose = elem.data("allow-close"); // Cho phép người dùng nhấn ra ngoài để đóng cửa sổ hiển thi
    let source = elem.data("src"); // nguồn hiển thì. Nếu type='inline' là ID của html, hoặc url nếu type='iframe'
    let size = elem.data("size"); // Size Alert: xs, s, n, l, xl. Default: auto
    let modal = elem.data("modal"); // Modal hiển thì theo dạng modal. Mặc định: false
    let closeExisting = elem.data("close-existing");
    let form_obj = elem.data("form");

    if ($.trim(type).length == 0) type = "iframe";
    if ($.trim(allowClose).length == 0) allowClose = false;
    if ($.trim(size).length == 0) size = "xl";
    if ($.trim(modal).length == 0) modal = false;
    if ($.trim(closeExisting).length == 0) closeExisting = true;

    // Cho phép đóng cửa sổ hiển thi hay không
    if (allowClose == false) {
        clickSlide = false;
        clickOutside = false;
    } else {
        clickSlide = "close";
        clickOutside = "close";
    }

    // console.log(modal)
    // console.log($.trim(modal).length == 0)
    // Xoá Toastr Message
    toastr.clear();

    $.fancybox.open({
        src: source,
        type: type,
        closeExisting: closeExisting,
        iframe: {
            preload: false,
        },
        opts: {
            btnTpl: {
                smallBtn: "",
            },
            modal: modal,
            touch: false,
            clickSlide: clickSlide,
            clickOutside: clickOutside,
            beforeShow: function (instance, current) {
                // App.initFormValidate();
            },
            beforeClose: function (instance, current) {
                toastr.clear();
            }
        },
    }, {
        baseClass: "fancybox-style",
        parentEl: form_obj,
        slideClass: "fancybox-slide-" + size,
    });

    // initFormValidate
};




//format định dạng tiền
function formatMoney(value, decimalDigit) {
    if (value == undefined || value == null || value.toString() == '') return '';

    if (decimalDigit === undefined) decimalDigit = 0;

    return value.f_formatMoney(decimalDigit, ".", ",");
}
//format định dạng float
function formatFloat(value, decimalDigit) {
    if (value == undefined || value == null || value.toString() == '') return '';

    if (decimalDigit === undefined) decimalDigit = 2;
    return value.f_formatMoney(decimalDigit, ".", ",");
}

// Thay the dau phan cach so
function char2number(p_str_value) {
    var v_ret_value;
    v_ret_value = replace(p_str_value, ",", "");
    if (isNaN(parseFloat(v_ret_value))) {
        v_ret_value = 0;
    }
    return v_ret_value;
}
// Thay the dau phan cach trong Json
function char2json(p_json_value) {
    var v_ret_value;
    v_ret_value = replace(p_json_value, "%2C", "");
    return v_ret_value;
}
//lam tròn số VNĐ
function lam_tron_so_vnd(p_value) {
    v_value = Math.round(p_value);
    return v_value;
}
//làm tròn số
function lam_tron_so(p_value) {
    v_value = (Math.round(p_value * 100)) / 100;
    if (v_value == Math.round(v_value)) {
        v_value = v_value;
    }
    return v_value;
}

var func_tinh_diem = function (elem, type, ty_trong, phan_tram_dat, diem_hoan_thanh, id_nguoi_danh_gia, count_form, extra_value = '', diem_max = '', diem_tru = '') {
    let name = $(elem).attr("name");
    let total = 0;

    if (type == _CONST._CONST_KIEU_CHAM_TEXT) {
        total = $(elem).val();
    } else if (type == _CONST._CONST_KIEU_CHAM_SELECT) {
        total = $(elem).find(':selected').data("value");
    } else if (type == _CONST._CONST_KIEU_CHAM_RADIO) {
        let ckb_checked = $("input[name='" + name + "']:checked");
        if (ckb_checked.length > 0) {
            ckb_checked.each(function () {
                let value = $(this).data("value");
                value = lam_tron_so(value);
                total += isNaN(parseFloat(value)) ? 0 : parseFloat(value);
            });
        }
    } else if (type == _CONST._CONST_KIEU_CHAM_DOANH_THU) {
        value_elem = parseFloat(char2number($(elem).val()));
        value = value_elem / extra_value * 100;
        total = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        total = lam_tron_so(total);
        if (total > diem_max) total = diem_max;
    } else if (type == _CONST._CONST_KIEU_CHAM_BOI_THUONG) {
        value_elem = parseFloat(char2number($(elem).val()));
        value_diff = extra_value - value_elem;
        value = 100 + value_diff * diem_tru;
        total = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        total = lam_tron_so(total);
        if (total > diem_max) total = diem_max;
        if (total < 0) total = 0;
    }

    let v_diem_hoan_thanh = (parseFloat(ty_trong) * total) / 100;
    v_diem_hoan_thanh = lam_tron_so(v_diem_hoan_thanh);

    $("input[name='" + phan_tram_dat + "']").val(total);
    if (type != 1) {
        $("input[name='" + phan_tram_dat + "']")[0].focus();
    }
    $("input[name='" + diem_hoan_thanh + "']").val(v_diem_hoan_thanh);
    func_tinh_tong_diem_hoan_thanh(id_nguoi_danh_gia, count_form);
}

var func_tinh_diem_2 = function (elem, type, diem_max, phan_tram_dat, id_nguoi_danh_gia, count_form) {
    let name = $(elem).attr("name");
    let total = 0;

    if (type == _CONST._CONST_KIEU_CHAM_TEXT) {
        total = $(elem).val();
        // console.log($(elem))
    } else if (type == _CONST._CONST_KIEU_CHAM_SELECT) {
        total = $(elem).find(':selected').data("value");
    } else if (type == _CONST._CONST_KIEU_CHAM_RADIO) {
        let ckb_checked = $("input[name='" + name + "']:checked");
        if (ckb_checked.length > 0) {
            ckb_checked.each(function () {
                let value = $(this).data("value");
                total += isNaN(parseFloat(value)) ? 0 : parseFloat(value);
            });
        }
        if (total > diem_max) total = diem_max;
    }

    $("input[name='" + phan_tram_dat + "']").val(total);
    if (type != 1) {
        $("input[name='" + phan_tram_dat + "']")[0].focus();
    }
    func_tinh_tong_diem_hoan_thanh(id_nguoi_danh_gia, count_form, 2);
}

var func_tinh_tong_diem_hoan_thanh = function (id_nguoi_danh_gia, count_form, type = 1) {
    let total = 0;
    id_list_diem = "input[name*='list_diem_hoan_thanh[" + id_nguoi_danh_gia + "]']:not('.parent_id')";
    id_tong_diem = "#id-tong-diem-" + id_nguoi_danh_gia;
    if (type == 2) {
        id_list_diem = 'input.' + id_nguoi_danh_gia + '';
        id_tong_diem = '#id-tong-diem-ky-nang' + id_nguoi_danh_gia;
    }
    $(id_list_diem).each(function () {
        let value = $(this).val();
        value.trim().length == 0 ? value = 0 : parseFloat(value);
        total += isNaN(parseFloat(value)) ? 0 : parseFloat(value);
    });
    total = lam_tron_so(total);
    $(id_tong_diem).val(total);
    func_tong_diem_chung_binh_chung(id_nguoi_danh_gia, count_form);
}

var func_tong_diem_chung_binh_chung = function (id_nguoi_danh_gia, count_form) {
    id_nguoi_danh_gia = id_nguoi_danh_gia.substring(1, id_nguoi_danh_gia.length);
    tong_diem_form_danh_gia = 0;
    tong_diem_form_ky_nang = 0;
    for (var i = 0; i < count_form; i++) {
        if (i == 0) {
            id_tong_diem_form_danh_gia = "id-tong-diem-" + i + id_nguoi_danh_gia;
            let value = $('#' + id_tong_diem_form_danh_gia).val()
            tong_diem_form_danh_gia = isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        } else {
            id_tong_diem_form_ky_nang = "id-tong-diem-ky-nang" + i + id_nguoi_danh_gia;
            let value = $('#' + id_tong_diem_form_ky_nang).val();
            tong_diem_form_ky_nang += isNaN(parseFloat(value)) ? 0 : parseFloat(value);
        };
    }
    total_2 = tong_diem_form_danh_gia + tong_diem_form_ky_nang;
    total_trung_binh_chung = 0;
    xep_loai = "";
    $('#id-tong-diem-danh-gia' + id_nguoi_danh_gia).children().remove();
    $('#id-tong-diem-danh-gia' + id_nguoi_danh_gia).append("<b class='main-color'>" + total_2 + "</b>");
    $('#tong_diem_danh_gia').find('.main-color').each(function () {
        total_trung_binh_chung += isNaN(parseFloat($(this).prop("outerText"))) ? 0 : parseFloat($(this).prop("outerText"));
    });
    total_trung_binh_chung = total_trung_binh_chung / ($('#tong_diem_danh_gia').find('.main-color').length);
    $('#tong_diem_trung_binh_chung').children().remove();
    $('#tong_diem_trung_binh_chung').append('<b class="text-red">' + total_trung_binh_chung + '</b>');

    if (total_trung_binh_chung >= 100) {
        xep_loai = 'Xuất sắc';
    } else if (total_trung_binh_chung >= 90 && total_trung_binh_chung < 100) {
        xep_loai = 'Giỏi';
    } else if (total_trung_binh_chung >= 70 && total_trung_binh_chung < 90) {
        xep_loai = 'Khá';
    } else if (total_trung_binh_chung >= 50 && total_trung_binh_chung < 70) {
        xep_loai = 'Trung Bình';
    } else {
        xep_loai = 'Yếu';
    }
    $('#xep_loai').children().remove();
    $('#xep_loai').append('<b class="text-red">' + xep_loai + '</b>');

}

var chon_danh_muc_cha = function (elem) {
    let value = $(elem).val();
    $(".form-control").removeClass("is-invalid");
    $(".error").remove();
    let form_group = $(".control-req").closest('.form-group');
    if (value.length == 0) {
        form_group.find('label > .text-red').remove();
        $(".control-req").prop('required', false);
    } else {
        if (form_group.find('label>.text-req').length == 0) {
            form_group.find('label').append('<span class="text-red text-req">*</span>');
            $(".control-req").prop('required', true);
        }
    }
}

// Hàm cập nhập tỉ trọng 
var cap_nhap_ty_trong = function (elem = "", run_ajax = true) {
    // if ($(elem).length > 0) {
    //     if (parseFloat($(elem).val()) > 100 || parseFloat($(elem).val()) < 0) {
    //         let _focus_func = function () {
    //             elem.focus();
    //             elem.select();
    //             elem.value = "";
    //         }
    //         Alert('Tỷ trọng phải nằm trong khoảng 1 - 100', _focus_func());
    //     }
    // }

    let row = $("table").find("tbody > tr[data-tt-id]");
    let list = [];

    for (var i = 0; i < row.length; i++) {
        let ty_trong = $(row[i]).find("input[name*='KPI[C_TY_TRONG]']").val()
        list.push({
            "parent_id": $(row[i]).data("tt-parent-id"),
            "id": $(row[i]).data("tt-id"),
            "value": isNaN(parseFloat(ty_trong)) ? 0 : parseFloat(ty_trong)
        });
    }

    // Tính tổng cha
    const sum_list = list.reduce((a, {
        parent_id,
        value
    }) => (a[parent_id] = (a[parent_id] || 0) + +value, a), {});

    for (id in sum_list) {
        $('[data-tt-id="' + id + '"]').find("input[name*='KPI[C_TY_TRONG]']").val(sum_list[id]);
    }

    // Total
    let total = 0;
    for (var i = 0; i < row.length; i++) {
        if ($(row[i]).data("level") == 1) {
            let ty_trong = $(row[i]).find("input[name*='KPI[C_TY_TRONG]']").val()
            total += isNaN(parseFloat(ty_trong)) ? 0 : parseFloat(ty_trong);
        }
    }

    if ($("#tong-ty-trong").length > 0) {
        $("#tong-ty-trong").val(total)
    }

    if (run_ajax) {
        // Chạy Ajax cập nhập tỷ trọng
        // ajax_cap_nhap_ty_trong();
    }
}

function check_ti_trong(elem, ti_trong_con_lai, id_kpi_chi_tiet) {
    let get_value = $(elem).val();
    let value = isNaN(parseFloat(get_value)) ? 0 : parseFloat(get_value);
    if (value > ti_trong_con_lai) {
        Alert("Tỷ trọng không được lớn hơn tỉ trọng tồn đọng!");
    }
    if (value < ti_trong_con_lai) {
        $("input[name='txt_ngay_hoan_thanh[" + id_kpi_chi_tiet + "]']").prop('readonly', true);
        $("input[name='txt_ngay_hoan_thanh[" + id_kpi_chi_tiet + "]']").removeAttr('required');
        $("input[name='txt_ngay_hoan_thanh[" + id_kpi_chi_tiet + "]']").val('');
        $("textarea[name='txt_noi_dung[" + id_kpi_chi_tiet + "]']").focus();
    }
    if (value == ti_trong_con_lai) {
        $("input[name='txt_ngay_hoan_thanh[" + id_kpi_chi_tiet + "]']").prop('readonly', false);
        $("input[name='txt_ngay_hoan_thanh[" + id_kpi_chi_tiet + "]']").prop('required', true);
    }
    let ti_trong_dang_ky = $('#ti_trong_dang_ky_' + id_kpi_chi_tiet).val();
    let ti_trong_danh_gia = value * ti_trong_dang_ky / 100;
    $('#ti_trong_danh_gia_' + id_kpi_chi_tiet).val(ti_trong_danh_gia);
}


function check_thoi_gian(elem, tu_ngay, den_ngay) {
    var date = moment($(elem).val(), 'DD-MM-YYYY');
    let f_tu_ngay = moment(tu_ngay).format("YYYY-MM-DD");
    let f_den_ngay = moment(den_ngay).format("YYYY-MM-DD");
    let v_check = moment(date.format('YYYY-MM-DD')).isBetween(f_tu_ngay, f_den_ngay, 'days', '[]');
    if (!v_check) {
        Alert("Thời gian hoàn thành phải năm trong khoảng thời gian đánh giá!");
    }
}

// Kiểm tra form đã thay đổi
// Thêm input:hidden id="frm_changed"
var form_check_changed = function () {
    if ($("[data-changed]").length > 0) {
        let $form = $("[data-changed]");
        let origForm = $form.serialize();
        $($form).find(':input').on('change input', function () {
            $form.data('changed', $form.serialize() !== origForm);
        });
    }
}
