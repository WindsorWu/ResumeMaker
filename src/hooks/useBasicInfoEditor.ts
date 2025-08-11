import { useState, useEffect } from 'react'
import type { BasicInfo, CustomField } from '@/types/resume'

// 防抖函数
const useDebounce = <T>(value: T, delay: number): T => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

export const useBasicInfoEditor = (
  initialData: BasicInfo,
  onSave: (data: BasicInfo) => void
) => {
  const [formData, setFormData] = useState<BasicInfo>({
    ...initialData,
    customFields: initialData.customFields || []
  })
  const [expandedCustomField, setExpandedCustomField] = useState<string | null>(null)

  // 防抖保存，减少卡顿
  const debouncedFormData = useDebounce(formData, 300)

  useEffect(() => {
    onSave(debouncedFormData)
  }, [debouncedFormData]) // 移除onSave依赖，避免无限渲染

  const handleChange = (field: keyof BasicInfo, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleAvatarChange = (avatar: string) => {
    setFormData(prev => ({
      ...prev,
      avatar,
    }))
  }

  const addCustomField = () => {
    const newField: CustomField = {
      id: Date.now().toString(),
      label: '',
      value: '',
      icon: 'star',
      iconName: 'star'
    }
    setFormData(prev => ({
      ...prev,
      customFields: [...(prev.customFields || []), newField]
    }))
    setExpandedCustomField(newField.id)
  }

  const updateCustomField = (id: string, updates: Partial<CustomField>) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields?.map(field => 
        field.id === id ? { ...field, ...updates } : field
      ) || []
    }))
  }

  const removeCustomField = (id: string) => {
    setFormData(prev => ({
      ...prev,
      customFields: prev.customFields?.filter(field => field.id !== id) || []
    }))
    if (expandedCustomField === id) {
      setExpandedCustomField(null)
    }
  }

  const toggleCustomFieldExpansion = (id: string) => {
    setExpandedCustomField(expandedCustomField === id ? null : id)
  }

  return {
    formData,
    expandedCustomField,
    handleChange,
    handleAvatarChange,
    addCustomField,
    updateCustomField,
    removeCustomField,
    toggleCustomFieldExpansion
  }
} 