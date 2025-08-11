import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface FormFieldProps {
  id: string
  label: string
  type?: string
  value: string
  placeholder: string
  onChange: (value: string) => void
}

export const FormField = ({ 
  id, 
  label, 
  type = 'text', 
  value, 
  placeholder, 
  onChange 
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    </div>
  )
} 