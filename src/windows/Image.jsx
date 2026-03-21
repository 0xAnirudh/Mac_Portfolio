import WindowWrapper from '#hoc/WindowWrapper.jsx';
import { WindowControls } from '#components';
import useWindowStore from '#store/window.js';

const Image = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile.data;

  if (!data) return null;

  const { name, imageUrl, image } = data;
  const src = imageUrl || image;

  return (
    <>
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="preview">
        {src ? <img src={src} alt={name} /> : null}
      </div>
    </>
  );
};

const ImageWindow = WindowWrapper(Image, 'imgfile');

export default ImageWindow;
