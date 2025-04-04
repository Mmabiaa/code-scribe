
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SUPPORTED_LANGUAGES } from "@/lib/constants";

interface LanguageSelectorProps {
  language: string;
  onChange: (value: string) => void;
}

const LanguageSelector = ({ language, onChange }: LanguageSelectorProps) => {
  return (
    <Select value={language} onValueChange={onChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select language" />
      </SelectTrigger>
      <SelectContent>
        {Object.entries(SUPPORTED_LANGUAGES).map(([langKey, langName]) => (
          <SelectItem key={langKey} value={langKey}>
            {langName}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSelector;
