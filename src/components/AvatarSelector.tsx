
import React from 'react';
import DigitalAvatar from '@/components/DigitalAvatar';

interface AvatarSelectorProps {
  selectedAvatar: string;
  onKnowledgePanelToggle: () => void;
  onCodeEditorToggle: () => void;
  onVisioNETToggle: () => void;
}

const AvatarSelector: React.FC<AvatarSelectorProps> = ({
  selectedAvatar,
  onKnowledgePanelToggle,
  onCodeEditorToggle,
  onVisioNETToggle
}) => {
  if (selectedAvatar === "einstein") {
    return (
      <DigitalAvatar
        name="Einstein"
        greeting="The universe is full of magical things patiently waiting for our wits to grow sharper."
        backgroundColor="bg-slate-800"
        foregroundColor="text-slate-50"
        animation="sparkle"
        onInteract={onKnowledgePanelToggle}
      />
    );
  } else if (selectedAvatar === "tesla") {
    return (
      <DigitalAvatar
        name="Tesla"
        greeting="The present is theirs; the future, for which I really worked, is mine."
        backgroundColor="bg-gray-900"
        foregroundColor="text-blue-100"
        animation="pulse"
        onInteract={onCodeEditorToggle}
      />
    );
  } else if (selectedAvatar === "yeshua") {
    return (
      <DigitalAvatar
        name="Yeshua"
        greeting="Love your neighbor as yourself; there is no greater commandment than this."
        backgroundColor="bg-indigo-900"
        foregroundColor="text-amber-100"
        animation="sparkle"
        onInteract={onVisioNETToggle}
      />
    );
  }
  
  // Default avatar
  return (
    <DigitalAvatar
      name="Visionary"
      greeting="The wisdom of the ages is now at your fingertips."
      backgroundColor="bg-slate-800"
      foregroundColor="text-slate-50"
      animation="sparkle"
      onInteract={onVisioNETToggle}
    />
  );
};

export default AvatarSelector;
