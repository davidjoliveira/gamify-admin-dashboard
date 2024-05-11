import { ExtraColorKeys, FullPalletColorsKeys, GradientKeys } from "assets/theme/base/colors";

class ColorUtils {
  convertStringToTypographyColor = (str: string): GradientKeys & ExtraColorKeys => {
    //TODO criar checagens
    return str as GradientKeys & ExtraColorKeys;
  }

  convertStringToPalleteColor = (str: string): FullPalletColorsKeys => {
    return str as FullPalletColorsKeys;
  }
}

export default new ColorUtils();