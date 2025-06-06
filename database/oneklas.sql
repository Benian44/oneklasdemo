# Creation de la base de donnees
CREATE DATABASE IF NOT EXISTS oneklas;
USE oneklas;

# Table des utilisateurs (table generique pour tous les types d'utilisateurs)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    prenom VARCHAR(100) NOT NULL,
    telephone VARCHAR(20) NOT NULL UNIQUE,
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255) NOT NULL,
    type_utilisateur ENUM('eleve', 'parent', 'enseignant', 'admin') NOT NULL,
    adresse TEXT NOT NULL,
    ville VARCHAR(100) NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    derniere_connexion DATETIME,
    statut BOOLEAN DEFAULT TRUE
);

# Table des eleves (informations specifiques aux eleves)
CREATE TABLE eleves (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    cycle ENUM('college', 'lycee') NOT NULL,
    classe VARCHAR(20) NOT NULL,
    parent_id INT,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (parent_id) REFERENCES users(id)
);

# Table des enseignants (informations specifiques aux enseignants)
CREATE TABLE enseignants (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    diplomes TEXT NOT NULL,
    cv_path VARCHAR(255),
    verification_status ENUM('en_attente', 'verifie', 'rejete') DEFAULT 'en_attente',
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

# Table des matieres
CREATE TABLE matieres (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nom VARCHAR(100) NOT NULL,
    description TEXT,
    cycle ENUM('college', 'lycee', 'tous') NOT NULL
);

# Table de liaison enseignants-matieres
CREATE TABLE enseignant_matiere (
    enseignant_id INT,
    matiere_id INT,
    PRIMARY KEY (enseignant_id, matiere_id),
    FOREIGN KEY (enseignant_id) REFERENCES enseignants(id) ON DELETE CASCADE,
    FOREIGN KEY (matiere_id) REFERENCES matieres(id) ON DELETE CASCADE
);

# Table des cours
CREATE TABLE cours (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    matiere_id INT NOT NULL,
    niveau VARCHAR(20) NOT NULL,
    type_cours ENUM('video', 'document', 'exercice') NOT NULL,
    contenu_url VARCHAR(255) NOT NULL,
    enseignant_id INT NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    statut ENUM('brouillon', 'publie', 'archive') DEFAULT 'brouillon',
    FOREIGN KEY (matiere_id) REFERENCES matieres(id),
    FOREIGN KEY (enseignant_id) REFERENCES enseignants(id)
);

# Table des sessions de mentorat
CREATE TABLE sessions_mentorat (
    id INT PRIMARY KEY AUTO_INCREMENT,
    eleve_id INT NOT NULL,
    enseignant_id INT NOT NULL,
    matiere_id INT NOT NULL,
    type_session ENUM('presentiel', 'enligne') NOT NULL,
    date_debut DATETIME NOT NULL,
    duree INT NOT NULL,
    statut ENUM('planifie', 'en_cours', 'termine', 'annule') DEFAULT 'planifie',
    tarif DECIMAL(10,2) NOT NULL,
    adresse_presentiel TEXT,
    lien_visio VARCHAR(255),
    FOREIGN KEY (eleve_id) REFERENCES eleves(id),
    FOREIGN KEY (enseignant_id) REFERENCES enseignants(id),
    FOREIGN KEY (matiere_id) REFERENCES matieres(id)
);

# Table des examens
CREATE TABLE examens (
    id INT PRIMARY KEY AUTO_INCREMENT,
    type_examen ENUM('BEPC', 'BAC') NOT NULL,
    annee INT NOT NULL,
    matiere_id INT NOT NULL,
    sujet_url VARCHAR(255) NOT NULL,
    corrige_url VARCHAR(255),
    FOREIGN KEY (matiere_id) REFERENCES matieres(id)
);

# Table des evenements
CREATE TABLE evenements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titre VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    date_debut DATETIME NOT NULL,
    date_fin DATETIME NOT NULL,
    type_evenement ENUM('conference', 'revision', 'atelier') NOT NULL,
    mode_participation ENUM('presentiel', 'enligne') NOT NULL,
    lieu VARCHAR(255),
    lien_visio VARCHAR(255),
    capacite_max INT,
    prix DECIMAL(10,2) DEFAULT 0.00,
    statut ENUM('a_venir', 'en_cours', 'termine', 'annule') DEFAULT 'a_venir'
);

# Table des inscriptions aux evenements
CREATE TABLE inscriptions_evenements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    evenement_id INT NOT NULL,
    user_id INT NOT NULL,
    date_inscription DATETIME DEFAULT CURRENT_TIMESTAMP,
    mode_participation ENUM('presentiel', 'enligne') NOT NULL,
    statut_paiement ENUM('en_attente', 'paye', 'rembourse') DEFAULT 'en_attente',
    FOREIGN KEY (evenement_id) REFERENCES evenements(id),
    FOREIGN KEY (user_id) REFERENCES users(id)
);

# Table des paiements
CREATE TABLE paiements (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    montant DECIMAL(10,2) NOT NULL,
    type_service ENUM('mentorat', 'evenement') NOT NULL,
    reference_service INT NOT NULL,
    date_paiement DATETIME DEFAULT CURRENT_TIMESTAMP,
    mode_paiement VARCHAR(50) NOT NULL,
    statut ENUM('en_attente', 'valide', 'refuse', 'rembourse') DEFAULT 'en_attente',
    FOREIGN KEY (user_id) REFERENCES users(id)
);

# Table des notifications
CREATE TABLE notifications (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    titre VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    type_notification ENUM('info', 'success', 'warning', 'error') NOT NULL,
    date_creation DATETIME DEFAULT CURRENT_TIMESTAMP,
    lu BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id)
);

# Insertion des matieres de base
INSERT INTO matieres (nom, description, cycle) VALUES
('Mathematiques', 'Cours de mathematiques', 'tous'),
('Physique-Chimie', 'Cours de physique et chimie', 'tous'),
('SVT', 'Sciences de la Vie et de la Terre', 'tous'),
('Francais', 'Cours de francais', 'tous'),
('Anglais', 'Cours d anglais', 'tous'),
('Histoire-Geographie', 'Cours d histoire et geographie', 'tous'),
('Philosophie', 'Cours de philosophie', 'lycee'),
('SES', 'Sciences Economiques et Sociales', 'lycee');

# Index pour optimiser les recherches
CREATE INDEX idx_users_type ON users(type_utilisateur);
CREATE INDEX idx_cours_matiere ON cours(matiere_id);
CREATE INDEX idx_cours_niveau ON cours(niveau);
CREATE INDEX idx_sessions_date ON sessions_mentorat(date_debut);
CREATE INDEX idx_evenements_date ON evenements(date_debut);
CREATE INDEX idx_examens_type_annee ON examens(type_examen, annee);
