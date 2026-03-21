 import { WindowControls } from '#components'
import WindowWrapper from '#hoc/WindowWrapper.jsx';
import React from 'react'
import { Search } from 'lucide-react';
import useLocationStore from '#store/location.js';
import useWindowStore from '#store/window.js';
import { locations } from '#constants/index.js';
import clsx from 'clsx';

const Finder = () => {

    const { openWindow } = useWindowStore();
    const { activeLocation, setActiveLocation } = useLocationStore();

    const openitem= (item) => {
        if (item.fileType === "pdf") return openWindow("resume");
        if (item.kind === "folder") return setActiveLocation(item);
        if (['fig', 'url'].includes(item.fileType) && item.href) return window.open(item.href, "blank");
        if (item.fileType === "txt") return openWindow("txtfile", item);

        openWindow(`${item.fileType}file`, item);
    };

    const renderList = (name, items) => (
        
        <div>
            <h3>{name}</h3>
            <ul>
                {items.map((item) => (
                    <li 
                        key={item.id}
                        onClick={() => setActiveLocation(item)} 
                        className={clsx(
                            item.id === activeLocation.id ? "active" : "not-active"
                        )}>
                        <img src={item.icon} alt={item.name} className="w-4" />
                        <p className="text-sn font-medium truncate">{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    );

  return (
    <>
        <div id="window-header">
            <WindowControls target="finder" />
            <Search className="icon" />
        </div>

        <div className="bg-white flex h-full">
            <div className="sidebar">
                {renderList('Favourites', Object.values(locations))}
                {renderList('My Projects', Object.values(locations.work.children))}
            </div>
            <ul className="content">
                {activeLocation?.children.map((item) => (
                    <li
                        key={item.id} 
                        className={item.position} 
                        onClick={() => openitem(item)}
                    >
                        <img src={item.icon} alt={item.name} />
                        <p>{item.name}</p>
                    </li>
                ))}
            </ul>
        </div>
    </>
  );
};

const FinderWindow = WindowWrapper(Finder, "finder");

export default FinderWindow;