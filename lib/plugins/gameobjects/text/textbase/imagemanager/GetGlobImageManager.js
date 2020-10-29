import ImageManager from './ImageManager.js';

var globImageManager;

export default function (textureManager) {
    if (globImageManager === undefined || globImageManager.textureManager !== textureManager) {
        globImageManager = new ImageManager(textureManager);
    }
    return globImageManager;
}