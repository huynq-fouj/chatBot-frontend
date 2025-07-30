export const typeWriter = async (text: string, target: { content: string }, delay = 40) => {
    target.content = "";
    for (const char of text) {
      target.content += char;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }

export const typeWriterHTML = async (htmlString: string, updateFn: (content: string) => void, delay = 50) => {  
    const container = document.createElement('div');
    container.innerHTML = htmlString;

    async function typeNode(node: Node, output: HTMLElement) {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent || "";
        for (const char of text) {
          output.innerHTML += char;
          updateFn(output.innerHTML);
          await new Promise(resolve => setTimeout(resolve, delay));
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        const clone = document.createElement(element.tagName);
        
        for (const attr of element.attributes) {
          clone.setAttribute(attr.name, attr.value);
        }

        output.appendChild(clone);
        for (const child of Array.from(element.childNodes)) {
          await typeNode(child, clone);
        }
      }
    }

    const output = document.createElement('div');
    for (const child of Array.from(container.childNodes)) {
      await typeNode(child, output);
    }

    updateFn(output.innerHTML);
  }