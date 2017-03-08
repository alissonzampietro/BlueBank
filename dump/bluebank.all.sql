-- --------------------------------------------------------
-- Servidor:                     127.0.0.1
-- Versão do servidor:           5.7.17-0ubuntu0.16.04.1 - (Ubuntu)
-- OS do Servidor:               Linux
-- HeidiSQL Versão:              9.4.0.5125
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;

SET sql_mode = '';
-- Copiando estrutura do banco de dados para bluebank
CREATE DATABASE IF NOT EXISTS `bluebank` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bluebank`;

-- Copiando estrutura para tabela bluebank.clientes
CREATE TABLE IF NOT EXISTS `clientes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `cpf` varchar(50) NOT NULL,
  `ativo` int(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL ,
  `updatedAt` datetime  ,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela bluebank.clientes: ~7 rows (aproximadamente)
/*!40000 ALTER TABLE `clientes` DISABLE KEYS */;
INSERT INTO `clientes` (`id`, `nome`, `cpf`, `ativo`, `createdAt`, `updatedAt`) VALUES
	(3, 'Alisson Zampietro Rodrigues', '35777268811', 1, '2017-02-25 15:20:52', '2017-02-25 15:20:53'),
	(4, 'Tedi Lucas', '32556595922', 1, '2017-02-25 16:51:52', '2017-02-25 16:51:54'),
	(5, 'Rosana Tavares', '35777268813', 1, '2017-02-25 21:25:48', '2017-02-25 18:35:10'),
	(13, 'Rosana Tavares', '35777268815', 1, '2017-02-25 21:37:09', '2017-02-25 21:37:09'),
	(15, 'Ricadinho', '2424242424', 1, '2017-02-25 21:39:12', '2017-02-25 21:39:12'),
	(16, 'Mauricio de Souza', '1262656855', 1, '2017-02-26 00:26:05', '2017-02-26 00:26:05'),
	(17, 'Jéssica Lopes', '2659585955', 1, '2017-02-26 00:27:02', '2017-02-26 00:27:02');
/*!40000 ALTER TABLE `clientes` ENABLE KEYS */;

-- Copiando estrutura para tabela bluebank.contas
CREATE TABLE IF NOT EXISTS `contas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_cliente` int(11) NOT NULL,
  `saldo` float NOT NULL,
  `ativo` int(1) NOT NULL DEFAULT '1',
  `createdAt` datetime NOT NULL ,
  `updatedAt` datetime  ,
  PRIMARY KEY (`id`),
  KEY `FK_contas_clientes` (`fk_cliente`),
  CONSTRAINT `FK_contas_clientes` FOREIGN KEY (`fk_cliente`) REFERENCES `clientes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela bluebank.contas: ~2 rows (aproximadamente)
/*!40000 ALTER TABLE `contas` DISABLE KEYS */;
INSERT INTO `contas` (`id`, `fk_cliente`, `saldo`, `ativo`, `createdAt`, `updatedAt`) VALUES
	(2, 5, 2500, 1, '2017-02-26 04:48:50', '2017-02-26 13:04:28'),
	(7, 17, 0, 1, '2017-02-26 03:57:16', '2017-02-26 13:04:28');
/*!40000 ALTER TABLE `contas` ENABLE KEYS */;

-- Copiando estrutura para tabela bluebank.transacoes
CREATE TABLE IF NOT EXISTS `transacoes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fk_conta_remetente` int(11) NOT NULL,
  `fk_conta_destinatario` int(11) NOT NULL,
  `valor` float NOT NULL,
  `updatedAt` datetime NOT NULL  ,
  `createdAt` datetime NOT NULL ,
  PRIMARY KEY (`id`),
  KEY `FK_transacoes_contas` (`fk_conta_remetente`),
  KEY `FK_transacoes_contas_2` (`fk_conta_destinatario`),
  CONSTRAINT `FK_transacoes_contas` FOREIGN KEY (`fk_conta_remetente`) REFERENCES `contas` (`id`),
  CONSTRAINT `FK_transacoes_contas_2` FOREIGN KEY (`fk_conta_destinatario`) REFERENCES `contas` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- Copiando dados para a tabela bluebank.transacoes: ~9 rows (aproximadamente)
/*!40000 ALTER TABLE `transacoes` DISABLE KEYS */;
INSERT INTO `transacoes` (`id`, `fk_conta_remetente`, `fk_conta_destinatario`, `valor`, `updatedAt`, `createdAt`) VALUES
	(1, 2, 7, 14, '2017-02-26 03:58:13', '2017-02-26 03:57:28'),
	(7, 7, 2, 250, '2017-02-26 12:53:39', '2017-02-26 12:53:39'),
	(8, 7, 2, 250, '2017-02-26 12:54:50', '2017-02-26 12:54:50'),
	(9, 7, 2, 250, '2017-02-26 12:55:49', '2017-02-26 12:55:49'),
	(10, 7, 2, 250, '2017-02-26 12:55:54', '2017-02-26 12:55:54'),
	(11, 7, 2, 500, '2017-02-26 12:56:01', '2017-02-26 12:56:01'),
	(12, 2, 7, 500, '2017-02-26 13:03:27', '2017-02-26 13:03:27'),
	(13, 2, 7, 100, '2017-02-26 13:03:49', '2017-02-26 13:03:49'),
	(14, 7, 2, 600, '2017-02-26 13:04:28', '2017-02-26 13:04:28');
/*!40000 ALTER TABLE `transacoes` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IF(@OLD_FOREIGN_KEY_CHECKS IS NULL, 1, @OLD_FOREIGN_KEY_CHECKS) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
