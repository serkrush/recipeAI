import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import RNFS from "react-native-fs";

export const getFilePathFromPHAsset = async (phUri) => {
    try {
      const destPath = `${RNFS.TemporaryDirectoryPath}/${Date.now()}.jpg`;
  
      await RNFS.copyAssetsFileIOS(phUri, destPath, 0, 0);
      
      return `file://${destPath}`;
    } catch (error) {
      console.error("error getFilePathFromPHAsset:", error);
      return null;
    }
};