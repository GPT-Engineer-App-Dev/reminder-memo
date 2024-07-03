import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Modal, ModalContent, ModalHeader, ModalFooter, ModalTitle, ModalDescription, ModalClose } from "@/components/ui/modal";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const AllNotes = () => {
  const [notes, setNotes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentNote, setCurrentNote] = useState({ title: "", content: "" });

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    note.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddNote = () => {
    setCurrentNote({ title: "", content: "" });
    setIsModalOpen(true);
  };

  const handleEditNote = (note) => {
    setCurrentNote(note);
    setIsModalOpen(true);
  };

  const handleSaveNote = () => {
    if (currentNote.id) {
      setNotes(notes.map(note => note.id === currentNote.id ? currentNote : note));
    } else {
      setNotes([...notes, { ...currentNote, id: Date.now() }]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <Input
          placeholder="Search notes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-1/2"
        />
        <Button onClick={handleAddNote}>Add Note</Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredNotes.map(note => (
          <Card key={note.id} onClick={() => handleEditNote(note)} className="cursor-pointer">
            <CardHeader>
              <CardTitle>{note.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription>{note.content}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
      <Modal open={isModalOpen} onOpenChange={setIsModalOpen}>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>{currentNote.id ? "Edit Note" : "Add Note"}</ModalTitle>
            <ModalClose />
          </ModalHeader>
          <ModalDescription>
            <Input
              placeholder="Title"
              value={currentNote.title}
              onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
              className="mb-4"
            />
            <Input
              placeholder="Content"
              value={currentNote.content}
              onChange={(e) => setCurrentNote({ ...currentNote, content: e.target.value })}
              className="mb-4"
            />
          </ModalDescription>
          <ModalFooter>
            <Button variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
            <Button onClick={handleSaveNote}>{currentNote.id ? "Save" : "Add"}</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default AllNotes;