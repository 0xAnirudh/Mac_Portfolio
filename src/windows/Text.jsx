import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { WindowControls } from '#components';
import useWindowStore from '#store/window.js';

const Text = () => {
  const { windows } = useWindowStore();
  const data = windows.txtfile.data;

  if (!data) return null;

  const { name, image, subtitle, description } = data;

  return (
    <>
      <div id="window-header">
        <WindowControls target="txtfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-5 bg-white space-y-6 max-h-[70vh] overflow-y-auto">
        {image ? <img src={image} alt={name} className="w-full h-auto rounded-md" /> : null}
        {subtitle ? <h3 className="text-lg font-semibold text-gray-900">{subtitle}</h3> : null}

        {Array.isArray(description)
          ? description.map((paragraph, index) => (
              <p key={`${name}-${index}`} className="text-sm text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            ))
          : null}
      </div>
    </>
  );
};

const TextWindow = WindowWrapper(Text, 'txtfile');

export default TextWindow;
