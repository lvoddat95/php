try {
    // Tự động submit khi thay đổi control có class: 'filter'
    autosubmit_when_control_changed('filter', 'frm_dsp_filter');
} catch (err) {
    alert(err);
}


// Đánh đánh checked cho dòng trên table
$(document).on("change", ".checkedRow", function () {
    $(this).parents("tr").toggleClass("row-checked", this.checked);
});

$(document).on("click", ".checkedAllRows", function () {
    let input_checked = $(this).closest("table").find("tbody input.checkedRow");
    input_checked.not(this).prop('checked', this.checked);
    input_checked.parents("tr").toggleClass("row-checked", this.checked);
});

// Repeater Xoá dòng checked trên table
var repeaterDeleteRow = function (elem, message = "") {
    let repeaterElem = $(elem).closest("[repeater]");
    let vMessage = "Xoá dòng này?";
    if ($.trim(message).length == 0) message = vMessage;

    let $checkedBox = repeaterElem.find("input[type='checkbox']:checked");
    if ($checkedBox.length < 1) {
        Alert("Chưa có đối tượng nào được chọn!");
        return false;
    }

    if (repeaterElem.length > 0) {
        if (confirm(message)) {
            repeaterElem.find("tbody>tr.row-checked").remove();
        }
    }
};

// Xoá dòng checked trên table
var deleteRow = function (tableElem, action, message = "Xoá dòng này?") {
    let table = $(tableElem);
    let $checkedBox = table.find("input[type='checkbox']:checked");
    if ($checkedBox.length < 1) {
        Alert("Chưa có đối tượng nào được chọn!");
        return false;
    }

    if (table.length > 0) {
        optionsAlert.html = message;
        optionsAlert.width = "300px";
        Swal.fire(optionsAlert).then((result) => {
            if (result.isConfirmed) {

                // Xoá dòng
                table.find("tbody>tr.row-checked").remove();

                switch (action) {
                    case "remove_id_can_bo":
                        remove_id_can_bo();
                        break;

                    case "xoa_kpi_chi_tiet":
                        ajax_delete_kpi_chi_tiet($checkedBox);
                        break;

                    case "xoa_can_bo_duyet":
                        remove_id_can_bo();
                        ajax_delete_can_bo_duyet($checkedBox);
                        break;

                    default:
                        break;
                }

            }
        });
    }
};

async function doAjax(url, params = {}, method = 'POST') {
    try {
        return $.ajax({
            url: url,
            type: method,
            dataType: 'json',
            data: params
        });
    } catch (error) {
        console.log('Lỗi doAjax!:\n', error);
    }
}

// Chọn kiểu chấm
function kieu_cham(element, table = "#danh-sach-cau-tra-loi") {
    let value = $(element).val();
    if (value == "1" || value == "") {
        $(table).slideUp(150);
    } else if (value == "2" || value == "3") {
        $(table).slideDown(150);
    }
};


// Sự kiện onchange lấy danh sách phòng ban theo đơn vị
function onchange_don_vi(p_object_don_vi, p_object_phong_ban) {
    let don_vi = $(p_object_don_vi);
    let phong_ban = $(p_object_phong_ban);
    let v_url = CONFIG.BASE_URL + 'ajax/base/act_fill_danh_sach_phong_ban/';

    var request = $.ajax({
        type: "POST",
        data: {
            p_unit_id: don_vi.val()
        },
        url: v_url
    });

    request.done(function (data) {
        phong_ban.html(data);
        // console.log(data)
        phong_ban.select2("val", "-1");
        return;
    });

    request.fail(function () {
        console.log("error");
    });
}

// Sự kiện onchange lấy danh sách cán bộ theo phòng ban,đơn vị
function onchange_phong_ban(p_object_don_vi, p_object_phong_ban, p_object_can_bo) {
    let don_vi = $(p_object_don_vi);
    let phong_ban = $(p_object_phong_ban);
    let can_bo = $(p_object_can_bo);
    let v_url = CONFIG.BASE_URL + 'ajax/base/act_fill_danh_sach_can_bo/';

    let data = {
        p_unit_id: don_vi.val(),
        p_department_id: phong_ban.val(),
    }

    var request = $.ajax({
        type: "POST",
        data: data,
        url: v_url
    });

    request.done(function (data) {
        can_bo.html(data);
        // console.log(data)
        return;
    });
}

// Hàm cập nhập giá trị của input, div theo className
function updateValue(newValue, className) {
    $("."+className).each(function () {
        var element = $(this);
        if (element.is("input")) {
            element.val(newValue);
        } else {
            element.text(newValue);
        }
    });
}

// Sự kiện onchange lấy tên Bộ KPIs theo phòng ban
function onchange_lay_ten_phong_ban(p_object_phong_ban) {
    let ten_phong_ban = $(p_object_phong_ban).find(":selected").text().toUpperCase();
    let ten_bang_kpi = _CONST._CONST_TEN_BO_KPIs_BEFORE + " " + ten_phong_ban + " " + _CONST._CONST_TEN_BO_KPIs_AFTER;
    updateValue(ten_bang_kpi, "ac_ten_bang_kpi");
}

// Reset biến lưu danh sách id cán bộ
function remove_id_can_bo() {
    let new_values = $("input[name='ds_can_bo[hdn_id_can_bo][]']")
        .map(function () {
            return $(this).val();
        }).get();
    $("#hdn_list_id_can_bo").val(new_values.toString());
}

// Popup danh sách cán bộ
function danh_sach_can_bo(elem) {
    let src = $(elem).data("src");
    let list_id = $("#hdn_list_id_can_bo").val();
    let v_url = "";
    let prams = "";
    if ($(elem).data('prams')) prams = $(elem).data("prams");
    v_url = src + prams;
    if (list_id.length > 0) {
        v_url = src + list_id + "/" + prams;
    }
    openWindow(v_url);
}

// Action chọn cán bộ
function chon_can_bo(data_elem, p_url = "") {
    if (p_url.length == "") {
        p_url = CONFIG.BASE_URL + 'ajax/danh_muc_nhom_danh_gia/act_fill_danh_sach_nguoi_danh_gia/';
    }
    // Lấy danh sách dòng có class "".row-checked"
    let row_checked = $(data_elem).find(".row-checked");

    // Lấy danh sách inputcheckbox checked
    let ckb_checked = row_checked.find('input[type=checkbox]:checked');

    if (ckb_checked.length < 1) {
        Alert("Chưa có đối tượng nào được chọn!");
        return false;
    }

    if (row_checked.length > 0) {

        // Lấy tất cả form control tạo danh sách serialize data POST đi
        let form_control = row_checked.find('input');

        // Lấy danh sách id ở input hidden - chuyển thành mảng array
        let hdn_list_id_can_bo = parent.$("#hdn_list_id_can_bo").val().trim(" ");
        let v_arr_hdn_list_id_can_bo = hdn_list_id_can_bo.split(",");
        let v_items_count = v_arr_hdn_list_id_can_bo.length;

        // Tạo mảng array danh sách id được chọn
        let list_id = [];
        for (const x of ckb_checked) {
            list_id.push(x.value);
        }

        // Ghép mảng 
        let concat_list_id = list_id.concat(hdn_list_id_can_bo);
        if (hdn_list_id_can_bo.length == 0) {
            concat_list_id = list_id;
            v_items_count = 0;
        }

        // Danh sách cán bộ hiện có
        let datastring = form_control.serialize() + '&p_items_selected=' + row_checked.length + '&p_items_count=' + v_items_count;

        $.ajax({
            type: "POST",
            data: datastring,
            url: p_url,
        }).done(function (data) {
            // console.log(data)
            let table_fill_data = parent.$("#tableDataFill > tbody");

            // cập nhật lại input hidden
            parent.$("#hdn_list_id_can_bo").val(concat_list_id.toString());

            // Fill thông tin vào bảng 
            table_fill_data.append(data)

            show_toast_message("Cập nhật thành công!");

            // Đóng màn hình
            setTimeout(() => {
                parent.$.fancybox.close();
            }, 500);
        });
        return;
    }

}

function chon_can_bo_duyet(data_elem, p_url = "") {
    if (p_url.length == "") {
        p_url = CONFIG.BASE_URL + 'ajax/danh_muc_kpi/act_fill_danh_sach_can_bo_duyet/';
    }
    // Lấy danh sách dòng có class "".row-checked"
    let row_checked = $(data_elem).find(".row-checked");

    // Lấy danh sách inputcheckbox checked
    let ckb_checked = row_checked.find('input[type=checkbox]:checked');

    if (ckb_checked.length < 1) {
        Alert("Chưa có đối tượng nào được chọn!");
        return false;
    }

    if (row_checked.length > 0) {

        // Lấy tất cả form control tạo danh sách serialize data POST đi
        let form_control = row_checked.find('input');

        // Lấy danh sách id ở input hidden - chuyển thành mảng array
        let hdn_list_id_can_bo = parent.$("#hdn_list_id_can_bo").val().trim(" ");
        let v_arr_hdn_list_id_can_bo = hdn_list_id_can_bo.split(",");
        let v_items_count = v_arr_hdn_list_id_can_bo.length;

        // Tạo mảng array danh sách id được chọn
        let list_id = [];
        for (const x of ckb_checked) {
            list_id.push(x.value);
        }

        // Ghép mảng 
        let concat_list_id = list_id.concat(hdn_list_id_can_bo);
        if (hdn_list_id_can_bo.length == 0) {
            concat_list_id = list_id;
            v_items_count = 0;
        }

        let v_id_kpi = parent.$('#hdn_id_kpi').val();
        let v_data_string = form_control.serialize() + '&p_items_selected=' + row_checked.length + '&p_items_count=' + v_items_count;

        // cập nhật lại input hidden
        parent.$("#hdn_list_id_can_bo").val(concat_list_id.toString());

        ajax_update_can_bo_duyet(v_id_kpi, v_data_string)

        // Đóng màn hình
        parent.$.fancybox.close();

        return;
    }
}


function chon_ban_kpi_recovery(data_elem) {
    // Lấy danh sách dòng có class "".row-checked"
    let row_checked = $(data_elem).find(".row-checked");
    // Lấy danh sách inputcheckbox checked
    let ckb_checked = row_checked.find('input[type=checkbox]:checked');

    if (ckb_checked.length < 1) {
        Alert("Chưa có đối tượng nào được chọn!");
        return false;
    }
    if (ckb_checked.length > 1) {
        Alert("Chỉ được chọn 1 đối tượng!");
        return false;
    }
    if (row_checked.length > 0) {
        // Lấy tất cả form control tạo danh sách serialize data POST đi
        let v_id_auto_save = row_checked.find('input').val();
        let v_id_t_nguoi_danh_gia = $('#hdn_id_nguoi_danh_gia').val();
        // Lấy danh sách id ở input hidden - chuyển thành mảng array    
        let v_data_string = 'v_id_auto_save=' + v_id_auto_save + '&v_id_t_nguoi_danh_gia=' + v_id_t_nguoi_danh_gia;
        let request = $.ajax({
            type: "POST",
            data: v_data_string,
            url: CONFIG.BASE_URL + 'ajax/danh_muc_danh_gia/act_update_item/3',
        });
        request.done(function (data) {
            let res = ajax_response(data);
            if (res) {
                let response = JSON.parse(data);
                var a = CONFIG.BASE_URL + response.body;
                window.location = a;
            }
        });
        return;
    }
}


// Ajax cập nhật cán bộ duyệt
function ajax_update_can_bo_duyet(p_id_kpi, p_data_string) {

    let request = $.ajax({
        type: "POST",
        data: p_data_string,
        url: CONFIG.BASE_URL + 'ajax/danh_muc_kpi/ajax_update_can_bo_duyet/' + p_id_kpi,
    });
    request.done(function (data) {
        window.parent.ajax_response(data);
        ajax_act_get_list_can_bo_duyet(p_id_kpi);
        return;
    });
}

// Ajax cập nhật cấp duyệt
function ajax_update_cap_ky_duyet(elem, p_id) {
    let v_cap_ky = $(elem).val();
    let v_id_kpi = $('#hdn_id_kpi').val();
    let v_data_string = '&p_cap_ky=' + v_cap_ky;
    let request = $.ajax({
        type: "POST",
        data: v_data_string,
        url: CONFIG.BASE_URL + 'ajax/danh_muc_kpi/ajax_update_cap_ky_duyet/' + p_id,
    });
    request.done(function (data) {
        ajax_response(data);
        ajax_act_get_list_can_bo_duyet(v_id_kpi);
        return;
    });
}

// Ajax xoá cán bộ duyệt
function ajax_delete_can_bo_duyet(obj_checked_box) {
    let v_id_kpi = $('#hdn_id_kpi').val();
    let data = obj_checked_box.serialize();

    let request = $.ajax({
        type: "POST",
        data: data,
        url: CONFIG.BASE_URL + 'ajax/danh_muc_kpi/ajax_delete_can_bo_duyet/',
    });
    request.done(function (data) {
        ajax_response(data);
        ajax_act_get_list_can_bo_duyet(v_id_kpi);
        return;
    });
}

// Ajax load danh sách bảng KPI chi tiết
function ajax_act_get_list_can_bo_duyet(p_id_kpi) {
    let url = CONFIG.BASE_URL + 'ajax/danh_muc_kpi/act_get_list_can_bo_duyet/';
    let data = {
        p_id_kpi: p_id_kpi,
    };

    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        success: function (html) {
            parent.$('#formCanBoKyDuyet').html(html);
        }
    });
}


// Danh sách kpi chi tiết
function danh_sach_kpi_chi_tiet(elem) {
    let src = $(elem).data("src");
    openWindow(src);
}

function addCommas(nStr) {
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

// Ajax Action cập nhật kpi chi tiết
function ajax_act_cap_nhap_tieu_chi_kpi(form_obj) {
    let v_id_kpi = $('#hdn_id_kpi').val();
    let v_id_kpi_chi_tiet = $('#PK_ID').val();

    let form_data = $(form_obj).serialize();
    let v_ty_trong_elem = $('[data-tt-id="' + v_id_kpi_chi_tiet + '"]').find("input[name*='KPI[C_TY_TRONG]']");

    if ($(form_obj).valid()) {
        let request = $.ajax({
            type: "POST",
            data: form_data,
            url: CONFIG.BASE_URL + 'ajax/kpi_tap_the/act_cap_nhap_tieu_chi_kpi/',
        });

        request.done(function (data) {
            let res = ajax_response(data);
            if (res) {
                $(form_obj).data("changed", false);

                // Hiển thị lại danh sách KPI
                ajax_get_list_tieu_chi(v_id_kpi);

                // Cập nhập lại tỷ trọng
                cap_nhap_ty_trong("", false);

                // Đóng màn hình
                setTimeout(() => {
                    parent.$.fancybox.close();
                }, 500);
            }
        });
        return;
    }
}

// Ajax load danh sách bảng KPI chi tiết
function ajax_get_list_tieu_chi(p_id_kpi) {
    let url = CONFIG.BASE_URL + 'ajax/kpi_tap_the/act_get_list_tieu_chi/';
    let data = {
        p_id_kpi: p_id_kpi,
    };

    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        success: function (html) {
            parent.$('#tableDataFillKPI').html(html);
        }
    });
}


// Ajax xoá kpi chi tiết
async function ajax_delete_kpi_chi_tiet(obj_checked_box) {
    let v_id_kpi = $('#hdn_id_kpi').val();
    let data = obj_checked_box.serialize();
    let kpi_parent_id = $(obj_checked_box).closest("tr").data("tt-parent-id")
    let url = CONFIG.BASE_URL + 'ajax/danh_muc_kpi/act_delete_kpi_chi_tiet/' + kpi_parent_id;
    // Chờ xoá thành công
    const response = await doAjax(url, data);
    if (response.code == 200) {
        // Cập nhập lại tỷ trọng
        cap_nhap_ty_trong();

        // Trả về kết quả + Hiển thị lại danh sách KPI
        ajax_response(response);
        ajax_get_list_kpi(v_id_kpi);
    }
}


// Ajax cập nhập tỷ trọng 
function ajax_cap_nhap_ty_trong(form = '#frm_update_data') {
    $.ajax({
        type: "POST",
        data: $(form).serialize(),
        url: CONFIG.BASE_URL + 'ajax/danh_muc_kpi/act_cap_nhap_ty_trong/false/false',
    }).done(function (data) {
        console.log("ajax_cap_nhap_ty_trong");
    });
}

// Ajax load danh sách bảng KPI chi tiết
function ajax_get_list_kpi(p_id_kpi) {
    let url = CONFIG.BASE_URL + 'ajax/danh_muc_kpi/act_get_list_kpi/';
    let data = {
        p_id_kpi: p_id_kpi,
    };

    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        success: function (html) {
            parent.$('#tableDataFillKPI').html(html);
        }
    });
}

// Action chọn phương pháp chấm
function chon_phuong_phap_cham(p_text_elem = "", p_value_elem = "") {
    let rdo_checked = $("input[name=rdo_phuong_phap]:checked", "form");
    if (rdo_checked.length == 0) {
        Alert("Chưa có đối tượng nào được chọn!");
        return false;
    }

    let v_id_phuong_phap = rdo_checked.val()
    let v_ten_phuong_phap = rdo_checked.data("name");
    // ID Loại KPI của phương pháp đang chọn
    let v_loai_kpi_id = rdo_checked.data("loai-kpi-id");
    let v_code_pp_cham = rdo_checked.data("code-pp_cham");
    // ID Loại KPI của bảng này
    let v_fk_loai_kpi = $('#hdn_fk_loai_kpi').val();

    if (v_loai_kpi_id != "") {
        if (v_loai_kpi_id != v_fk_loai_kpi) {
            Alert("Không được chọn Phương pháp chấm của phần khác");
            return;
        }
    }

    if (p_text_elem.trim().length == 0) {
        p_text_elem = "txt_ten_phuong_phap";
    }
    if (p_value_elem.trim().length == 0) {
        p_value_elem = "FK_PHUONG_PHAP_CHAM_KPI";
    }
    parent.$("#" + p_text_elem).val(v_ten_phuong_phap);
    parent.$("#" + p_value_elem).val(v_id_phuong_phap);
    //doanh thu
    if (v_code_pp_cham == 'DTKT') {
        parent.$("#phuong_phap_text").hide();
        parent.$(".phuong_phap_text").prop("disabled", true);
        parent.$("#phuong_phap_doanh_thu").show();
        parent.$(".phuong_phap_doanh_thu").removeAttr("disabled");
        parent.$("#phuong_phap_boi_thuong").hide();
        parent.$(".phuong_phap_boi_thuong").prop("disabled", true);
    }
    //boi thuong
    else if (v_code_pp_cham == 'TLBT') {
        parent.$("#phuong_phap_text").hide();
        parent.$(".phuong_phap_text").prop("disabled", true);
        parent.$("#phuong_phap_doanh_thu").hide();
        parent.$(".phuong_phap_doanh_thu").prop("disabled", true);
        parent.$("#phuong_phap_boi_thuong").show();
        parent.$(".phuong_phap_boi_thuong").removeAttr("disabled");
    }
    //text
    else {
        parent.$("#phuong_phap_text").show();
        parent.$(".phuong_phap_text").removeAttr("disabled");
        parent.$("#phuong_phap_doanh_thu").hide();
        parent.$(".phuong_phap_doanh_thu").prop("disabled", true);
        parent.$("#phuong_phap_boi_thuong").hide();
        parent.$(".phuong_phap_boi_thuong").prop("disabled", true);
    }


    // let src_str = parent.$("#btn_chon_phuong_phap_cham").data("src");
    // src_list = src_str.split("/").sort();
    // let new_src = src_str.replaceAll(src_list[1], v_id_phuong_phap);
    // parent.$("#btn_chon_phuong_phap_cham").data("src", new_src);
    parent.$.fancybox.close();
    return;
}

// Đếm tổng số dòng trong table repeater
function count_row_in_table(p_object, p_hidden_count, p_delete = false) {
    let row = $(p_object)[0].children;
    // console.log(row)
    let value = row.length + 1;
    if (p_delete == true) {
        value = row.length;
    }
    $(p_hidden_count).val(value);
}

// Kiểm tra max số dòng được thêm
var check_max_add_row = function (p_max, p_count_row) {
    let cout_row = parseInt($(p_count_row).val());
    let max = $(p_max).val();
    if (max == "" || max == "0") max = Number('Infinity');
    if (max < cout_row) {
        $(p_count_row).val(max);
        $(p_max).focus();
        Alert("Vượt quá giá trị tối đa!");
        return true;
    }
}

// kiem tra nhom kpi trong bang dang ky kpi
function check_loai_kpi(elem) {
    let nhom_kpi = $(elem).val();
    // console.log(nhom_kpi);
    if (nhom_kpi == _CONST._MA_NHOM_KPI_CA_NHAN) {
        $('#loai_kpi').addClass("flex").removeClass("hide");
    } else {
        $('#loai_kpi').addClass("hide").removeClass("flex");
    }
}
// kiem tra nhom loai kpi can bo
function ajax_get_loai_kpi_cb(elem, p_object_loai_kpi_can_bo) {
    let p_id_cb = $(elem).val();
    console.log(p_id_cb);
    let p_loai_kpi_cb = $(p_object_loai_kpi_can_bo);
    let p_code_cb = $('#txt_ma_cb');
    let url = CONFIG.BASE_URL + 'ajax/danh_muc_kpi/act_get_loai_kpi_cb/';
    let data = {
        p_id_cb: p_id_cb,
    };

    $.ajax({
        url: url,
        method: 'POST',
        data: data,
        success: function (html) {
            // ajax_response(html);
            let response = JSON.parse(html);
            console.log(response);
            console.log(response.message);
            let loai_cb = response.body.code;
            let loai_data_cb = response.body.data;
            if (loai_cb != null) {
                p_code_cb.val(loai_cb);
                p_loai_kpi_cb.html(loai_data_cb);
            } else {
                ajax_response(html);
                p_code_cb.val('');
                p_loai_kpi_cb.html(loai_data_cb);
            }
            return;
        }
    });

}

// Tính khoảng thời gian
var daterange_onchange = function (elem, dateText = "") {
    if ($(elem).is(".daterange-min")) {
        $(".daterange-max").datepicker('option', 'minDate', dateText);
        $(".daterange-max").data('min', $(elem).val());
    }
    let v_min = $(".daterange-min").val();
    let v_max = $(".daterange-max").val();

    let start_date = moment(v_min, "DD/MM/YYYY");
    let end_date = moment(v_max, "DD/MM/YYYY");

    if (v_min != "" && v_max != "") {
        let diff = end_date.diff(start_date, 'days') + 1;
        if (diff < 0) {
            Alert("Ngày kết thúc phải lớn hơn ngày bắt đầu!");
            $(".daterange-max").val("");
            diff = 0;
        }
        if ($(".daterange-count").length > 0) {
            $(".daterange-count").val(diff);
        }
    }
}

// Chọn nhanh tần suất thực hiện
var onchange_tan_suat = function (elem) {
    let dt = $(elem).val();
    let dt_item = dt.split(";");
    $(".daterange-min").datepicker("setDate", dt_item[0]);
    $(".daterange-max").datepicker("setDate", dt_item[1]);
    let start_date = moment(dt_item[0], "DD/MM/YYYY");
    let end_date = moment(dt_item[1], "DD/MM/YYYY");
    let diff = end_date.diff(start_date, 'days') + 1;
    if ($(".daterange-count").length > 0) {
        $(".daterange-count").val(diff);
    }
}


// Ajax Action cập nhật kpi chi tiết
function ajax_cap_nhap_danh_gia_kpi(form_obj, action = "") {
    optionsAlert.html = "Bạn có chắc chắn muốn đánh giá không ?";
    if (action == 1) optionsAlert.html = "Bạn có chắc chắn muốn lưu không ?";

    url_link = CONFIG.BASE_URL + 'ajax/danh_muc_danh_gia/act_update_item/';
    //Trường hợp là lưu thì action = true khi đó truyền biến 1 vào để sử lý bên trong
    $check_valid = true;
    if (action == 1) {
        url_link = CONFIG.BASE_URL + 'ajax/danh_muc_danh_gia/act_update_item/1';
        $check_valid = true;
    }
    else if (action == 2) {
        url_link = CONFIG.BASE_URL + 'ajax/danh_muc_danh_gia/act_update_item/2';
        $check_valid = true;
    }
    else if (action == 3) {
        url_link = CONFIG.BASE_URL + 'ajax/danh_muc_danh_gia/act_update_item/3';
        $check_valid = true;
    }
    else {
        if (!$(form_obj).valid()) {
            $list_elem = $(form_obj).find(".is-invalid");
            if ($list_elem.length > 0) {
                for (let index = 0; index < $list_elem.length; index++) {
                    $list_elem[0].focus();
                    $check_valid = $(form_obj).valid();
                }
            }
        }
    }

    if (action != 2) {
        Swal.fire(optionsAlert).then((result) => {
            if (result.isConfirmed) {
                isConfirmed();
            }
        });
    }
    else {
        isConfirmed(action);
    }

    function isConfirmed(action = '') {
        let form_data = $(form_obj).serialize();
        //Bỏ dấu ','
        form_data = char2json(form_data);
        if ($check_valid) {
            let request = $.ajax({
                type: "POST",
                data: form_data,
                url: url_link,
            });
            if (action == '') {
                request.done(function (data) {
                    let res = ajax_response(data);
                    if (res) {
                        let response = JSON.parse(data);
                        var a = CONFIG.BASE_URL + response.body;
                        window.location = a;
                    }
                });
            }
        } else {
            Alert("Vui lòng nhập đầy đủ thông tin!");
        }
    }
}

function export_report_kpi(p_forms, p_action_url, p_target, p_count_status) {
    if (p_count_status > 0) {
        optionsAlert.html = "Có " + p_count_status + " cán bộ chưa được đánh giá xong. Bạn có tiếp tục xuất báo cáo không?";
        Swal.fire(optionsAlert).then((result) => {
            if (result.isConfirmed) {
                frm_submit(p_forms, p_action_url, p_target);
                v_is_ok = true;
            }
        });
    } else {
        frm_submit(p_forms, p_action_url, p_target);
    }
}

var ajax_danh_dau_da_doc = function (elem, p_id) {
    console.log(p_id);
    let request = $.ajax({
        type: "POST",
        url: CONFIG.BASE_URL + 'ajax/notification/ajax_act_danh_dau_da_doc/' + p_id,
    });

    request.done(function (data) {
        console.log(data)
        // let res = ajax_response(data);
        // if (res) {
        //     let response = JSON.parse(data);
        //     var a = CONFIG.BASE_URL + response.body;
        //     setTimeout(() => {
        //         location.href = a;
        //     }, 900);
        // }
    });
}

// Fill phương pháp chấm 
var ajax_act_fill_phuong_phap_cham_kpi = function (elem) {
    let v_id_phuong_phap = $(elem).val();
    let div_kieu_cham = $('#div_kieu_cham');
    div_kieu_cham.removeClass('highlight')
    let request = $.ajax({
        type: "POST",
        url: CONFIG.BASE_URL + 'ajax/base/act_fill_phuong_phap_cham_kpi/' + v_id_phuong_phap,
    });

    request.done(function (data) {
        div_kieu_cham.addClass('highlight').html(data);
        // callback init core 
        App.initCore();
    });
}


function confirmChecked(elem) {
    if (confirm('Bạn có chắc chắn đánh giá trước hạn công việc này không?')) {
        $(elem).prop('checked', true);
    } else {
        $(elem).prop('checked', false);
    }
}

// Onchange kỳ đánh giá để tạo luong danh giá
function onchange_ngay(elem) {
    let ky_danh_gia = $(elem).val();
    if (ky_danh_gia == "") {
        $('#txt_tu_ngay').val("");
        $('#txt_den_ngay').val("");
        return;
    }
    let v_url = CONFIG.BASE_URL + 'ajax/base/act_chon_ky_danh_gia/';
    var request = $.ajax({
        type: "POST",
        data: {
            p_ky_danh_gia_id: ky_danh_gia
        },
        url: v_url
    });
    request.done(function (data) {
        let response = JSON.parse(data);
        p_tu_ngay = new Date(response['C_TU_NGAY']);
        p_den_ngay = new Date(response['C_DEN_NGAY']);
        p_tu_ngay = dateFormat(p_tu_ngay, "DD/MM/YYYY");
        p_den_ngay = dateFormat(p_den_ngay, "DD/MM/YYYY");
        $('#txt_tu_ngay').val(p_tu_ngay);
        $('#txt_den_ngay').val(p_den_ngay);
        return;
    });
}