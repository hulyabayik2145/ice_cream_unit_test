import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Toppings from ".";
test("sosları ekleme ve çıkarma işlemleri toplama etki eder", async () => {
  const user = userEvent.setup();
  //1) bileşenleri renderla
  render(<Toppings />);
  //2)toplam spanı al
  const total = screen.getByTestId("total");

  //3)bütün sos checboxlarını al
  const toppings = await screen.findAllByRole("checkbox");
  //4) toplam ücret 0 mı kontrol et
  expect(total.textContent).toBe("0");
  //5) bütün checked boxların tiksiz olduğunu kontrol et
  toppings.forEach((i) => expect(i).not.toBeChecked());
  //6) soslardan birine tıkla
  await user.click(toppings[0]);
  //7) total 3 e eşitmikontrol et
  expect(total.textContent).toBe("3");
  //8) soslardan birine daha tıkla
  await user.click(toppings[4]);
  //9) total 6 ya eşitmi kotrol et
  expect(total.textContent).toBe("6");
  //10) eklenen soslardan birini çıkar
  await user.click(toppings[4]);
  //11) total 3'e eşitmi kontrol et
  expect(total.textContent).toBe("3");
  //12) eklenene son sosu çıkar
  await user.click(toppings[0]);
  //13) total 0 a eşit mi kotrol et
  expect(total.textContent).toBe("0");
});
