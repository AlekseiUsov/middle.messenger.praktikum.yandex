import { Block } from "./Block";

class TestBlockWithProps extends Block {
  render() {
    return "<div>{{text}}</div>";
  }
}

it("рендерит корректно", () => {
  const childBlock = new TestBlockWithProps({});
  const block = new TestBlockWithProps({ text: "test", child: childBlock });
  const content = block.getContent();

  expect(content.textContent).toContain("test");
  expect(block.children.child).toBe(childBlock);
});

it("устанавливает пропсы корректно", () => {
  const block = new TestBlockWithProps({ someValue: "someValue" });
  expect(block.props.someValue).toBe("someValue");

  const newProps = { someValue: "newValue" };
  block.setProps(newProps);

  expect(block.props.someValue).toBe("newValue");
});

it("не вызывает рендер если пропсы равны", () => {
  const block = new TestBlockWithProps({ someValue: "someValue" });

  const newProps = { someValue: "someValue" };
  block.setProps(newProps);
  const mockRender = jest.spyOn(block, "_render");

  expect(mockRender).toHaveBeenCalledTimes(0);
});

it("установка новых пропсов тригерит ререндер", () => {
  const block = new TestBlockWithProps({ props: "initial" });
  const mockRender = jest.spyOn(block, "_render");

  block.setProps({ newProp: "value" });

  expect(mockRender).toHaveBeenCalledTimes(1);
});
