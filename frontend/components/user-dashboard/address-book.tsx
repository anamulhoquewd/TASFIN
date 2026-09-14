"use client";

import { useEffect, useState } from "react";
import { Pencil, Save, Trash2, X } from "lucide-react";
import { IAddress } from "@/interfaces/orders";
import useUsers from "@/hooks/users/use-users";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";

const emptyAddress: IAddress = {
  street: "",
  city: "",
  state: "",
  zipCode: "",
  country: "Bangladesh",
};

export default function AddressBook() {
  const { getProfile, updateAddress, deleteAddress } = useUsers();
  const [addresses, setAddresses] = useState<IAddress[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [draft, setDraft] = useState<IAddress>(emptyAddress);
  const [isSaving, setIsSaving] = useState(false);

  const loadAddresses = async () => {
    const response = await getProfile();
    setAddresses(response?.data?.addresses ?? []);
  };

  useEffect(() => {
    loadAddresses();
  }, []);

  const startEditing = (address?: IAddress) => {
    setEditingId(address?._id ?? "new");
    setDraft(address ? { ...address } : { ...emptyAddress });
  };

  const updateDraft = (field: keyof IAddress, value: string) => {
    setDraft((current) => ({ ...current, [field]: value }));
  };

  const saveAddress = async () => {
    if (!editingId || editingId === "new") return;
    setIsSaving(true);
    try {
      await updateAddress(editingId, draft);
      await loadAddresses();
      setEditingId(null);
    } finally {
      setIsSaving(false);
    }
  };

  const removeAddress = async (addressId: string) => {
    if (!window.confirm("Delete this address?")) return;
    await deleteAddress(addressId);
    await loadAddresses();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Saved addresses</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {addresses.length === 0 && editingId === null && (
          <p className="text-sm text-muted-foreground">No saved addresses.</p>
        )}
        {addresses.map((address) => (
          <div key={address._id} className="border p-4 space-y-3">
            {editingId === address._id ? (
              <AddressEditor
                draft={draft}
                onChange={updateDraft}
                onCancel={() => setEditingId(null)}
                onSave={saveAddress}
                isSaving={isSaving}
              />
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <p className="text-sm leading-6">
                  {address.street}, {address.city}
                  {address.state ? `, ${address.state}` : ""}
                  {address.zipCode ? ` - ${address.zipCode}` : ""}, {address.country}
                </p>
                <div className="flex shrink-0 gap-2">
                  <Button type="button" variant="outline" size="icon" onClick={() => startEditing(address)} aria-label="Edit address">
                    <Pencil />
                  </Button>
                  <Button type="button" variant="destructive" size="icon" onClick={() => address._id && removeAddress(address._id)} aria-label="Delete address">
                    <Trash2 />
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

function AddressEditor({
  draft,
  onChange,
  onCancel,
  onSave,
  isSaving,
}: {
  draft: IAddress;
  onChange: (field: keyof IAddress, value: string) => void;
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
}) {
  return (
    <div className="space-y-3">
      {(["street", "city", "state", "zipCode", "country"] as const).map((field) => (
        <Input
          key={field}
          value={draft[field] ?? ""}
          placeholder={field}
          onChange={(event) => onChange(field, event.target.value)}
        />
      ))}
      <div className="flex gap-2">
        <Button type="button" onClick={onSave} disabled={isSaving}>
          <Save /> Save
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          <X /> Cancel
        </Button>
      </div>
    </div>
  );
}