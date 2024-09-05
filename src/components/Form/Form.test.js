
import { fireEvent, render, screen } from "@testing-library/react";
import Form from "."

test("Koşullarının onaylanmasına göre buton aktifliği", () => {
    //* 1) test edilecek olan bileşen rendr edilir
    render(<Form />);

    //* 2)GEREKLİ ELEMANLARI ÇAĞIR
    const button = screen.getByRole("button");
    const checkbox = screen.getByRole("checkbox")


    //* 3) CHECKBOXIN TİKLENMEMİŞ OLDUĞUNU KONTROL ET
    expect(checkbox).not.toBeChecked()

    //* 4) BUTONUN İNAKTİF OLDUĞUNU KONTROL ET
    expect(button).toBeDisabled();

    //* 5)CHECKBOXA TIKLA
    fireEvent.click(checkbox);

    //* 6) BUTONUN AKTİF OLDUĞUNU KONTROL ET
    expect(button).toBeEnabled();

    //* 7) CHECKBOX A TIKLA
    fireEvent.click(checkbox);

    //* 8) BUTONUN İNAKTİF OLDUĞUNU KONTROL ET
    expect(button).toBeDisabled();
});

test("Onay butonunun hover durumuna göre bildirim gözükür", () => {
    //* 1) formu renderle

    render(<Form />);

    //* 2) gerekli elemanları al

    const checkbox = screen.getByRole("checkbox");
    const button = screen.getByRole("button");

    const alert = screen.getByText(/size gerçekten/i);//insersetive


    //* 3) checkbox i tıkla (butonu aktif hale getir)
    fireEvent.click(checkbox);

    //* 4) bildirimin ekranda olmadığını kontrol et
    expect(alert).not.toBeVisible();

    //* 5 mouse u butona getir
    fireEvent.mouseEnter(button);

    //* 6) bildirim ekrana geldi mi kontrol et
    expect(alert).toBeVisible();

    //* 7) mouse u butondan çek
    fireEvent.mouseLeave(button);

    //* 8) bildirim ekrandan gittimi kontrol et
    expect(alert).not.toBeVisible();
})